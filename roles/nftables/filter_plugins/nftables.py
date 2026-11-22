from ansible.errors import AnsibleFilterError

ALIASES = {
    "from": "source_interface",
    "to": "destination_interface",
    "raw": "protocol_raw",
}

FILTER_ACTIONS = ("accept", "drop", "reject")
NAT_ACTIONS = ("dnat", "masquerade")


def _flatten(entries, inherited=None):
    inherited = inherited or {}
    for entry in entries or []:
        if not isinstance(entry, dict):
            raise AnsibleFilterError("nftables rule entries must be mappings")
        base = {key: value for key, value in entry.items() if key != "rules"}
        merged = {**inherited, **base}
        if "rules" in entry:
            if not isinstance(entry["rules"], list):
                raise AnsibleFilterError("nftables 'rules' must be a list")
            yield from _flatten(entry["rules"], merged)
        else:
            yield merged


def _apply_aliases(rule):
    result = dict(rule)
    for alias, key in ALIASES.items():
        if alias not in result:
            continue
        if key in result:
            raise AnsibleFilterError(f"nftables rule defines both '{alias}' and '{key}'")
        result[key] = result.pop(alias)
    return result


def _service(rule, services):
    name = rule.get("service")
    if name is None:
        return None
    service = services.get(name)
    if service is None:
        raise AnsibleFilterError(f"nftables service '{name}' is not defined")
    return service


def _protocol(rule, services):
    protocol = rule.get("protocol")
    if protocol:
        return protocol
    service = _service(rule, services)
    if service is None:
        return None
    protocols = list((service.get("protocols") or {}).keys())
    if len(protocols) != 1:
        raise AnsibleFilterError(
            f"nftables service '{rule['service']}' defines several protocols, set 'protocol'"
        )
    return protocols[0]


def _ports(rule, services, protocol):
    if "ports" in rule:
        return list(rule["ports"])
    service = _service(rule, services)
    if service is None:
        return []
    return list((service.get("protocols") or {}).get(protocol, []))


def _expand_dnat(rule, services, protocol):
    ports = _ports(rule, services, protocol)
    if not ports:
        if "to_port" in rule:
            rule["destination_port"] = rule["to_port"]
        return [rule]
    expanded = []
    for port in ports:
        item = dict(rule)
        item["source_port"] = port
        item["destination_port"] = rule.get("to_port", port)
        expanded.append(item)
    return expanded


def nftables_expand(entries, kind="generic", services=None):
    services = services or {}
    result = []
    for raw_rule in _flatten(entries):
        rule = _apply_aliases(raw_rule)
        protocol = _protocol(rule, services)
        if protocol:
            rule["protocol"] = protocol
        if kind == "nat":
            if rule.get("masquerade") and rule.get("dnat_to"):
                raise AnsibleFilterError(
                    "nftables NAT rule cannot use both 'masquerade' and 'dnat_to'"
                )
            if rule.get("masquerade"):
                rule["action"] = "masquerade"
                rule.setdefault("chain", "postrouting")
            elif rule.get("dnat_to"):
                rule["action"] = "dnat"
                rule.setdefault("chain", "prerouting")
            else:
                raise AnsibleFilterError(
                    "nftables NAT rule requires 'dnat_to' or 'masquerade: true'"
                )
        else:
            if rule.get("masquerade") or rule.get("dnat_to"):
                raise AnsibleFilterError(
                    "nftables NAT keywords are only valid in nftables_nat_rules"
                )
            rule.setdefault("action", "accept")
            if kind != "generic":
                rule.setdefault("chain", kind)
        if "chain" not in rule:
            raise AnsibleFilterError("generic nftables rule requires 'chain'")
        if rule["action"] not in FILTER_ACTIONS + NAT_ACTIONS:
            raise AnsibleFilterError(f"unknown nftables action '{rule['action']}'")
        if rule["action"] == "dnat":
            result.extend(_expand_dnat(rule, services, protocol))
        else:
            result.append(rule)
    return result


class FilterModule(object):
    def filters(self):
        return {"nftables_expand": nftables_expand}
