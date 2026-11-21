# ansible-debian-firewall

[![Debian 13](https://img.shields.io/badge/Debian-13%20%7C%2014-D70A53?logo=debian&logoColor=white)](https://www.debian.org/releases/) [![Ansible](https://img.shields.io/badge/Ansible-2.15%2B-EE0000?logo=ansible&logoColor=white)](https://docs.ansible.com/) [![License](https://img.shields.io/badge/license-BSD--2--Clause-087f78.svg)](LICENSE) [![Website](https://img.shields.io/badge/website-GitHub%20Pages-1769aa)](https://petrouz.github.io/ansible-debian-firewall/)

Production-oriented Ansible roles for building secure, auditable and reproducible Debian 13 and Debian 14 firewalls.

ansible-debian-firewall is a collection of Ansible roles for deploying standard Debian firewalls. It covers the base system, network configuration, nftables, VPN, dynamic routing and high availability without replacing Debian with a proprietary appliance.

## Why this project

The firewall is defined as code and deployed with standard Ansible. Network configuration, packet filtering, VPNs, routing and high availability remain visible in the repository and can be reviewed like any other infrastructure change.

## Features

- Stateful nftables firewall with filtering, NAT, logging and policy defaults
- Debian 13 and Debian 14 with systemd-networkd network configuration
- WireGuard VPN with peer management
- StrongSwan IPsec VPN
- FRRouting for OSPF and BGP dynamic routing
- Keepalived VRRP high availability
- conntrackd session state synchronization
- Standalone and active-passive firewall deployments
- Reproducible execution through a single playbook
- BSD 2-Clause licensed and free to adapt

## Roles

| Role | Responsibility |
| --- | --- |
| `base` | Chrony, rsyslog, SSH hardening, locale, unattended upgrades and SNMP |
| `network` | Interfaces, VLANs, bonds, routes, DNS and sysctl with systemd-networkd |
| `nftables` | Stateful firewall policy, NAT, optional drop logging and aliases |
| `wireguard` | WireGuard interfaces, peers and HA-aware configuration |
| `strongswan` | IPsec tunnels and authentication configuration |
| `frr` | OSPF, BGP and dynamic routing services |
| `keepalived` | VRRP virtual IP and failover management |
| `conntrackd` | Stateful connection synchronization between nodes |

## Requirements

- Debian 13 and Debian 14
- Ansible 2.15 or newer
- SSH access with privilege escalation
- Two nodes for high availability features

## Quick start

Clone the repository, review the inventory and adapt the variables to your environment.

```
git clone git@github.com:petrouz/muros.git
cd ansible-debian-firewall
ansible-galaxy collection install -r requirements.yml
ansible-playbook -i inventory.yml site.yml
```

The inventory and variables are deliberately explicit. Keep environment-specific values in `host_vars` and `group_vars`, protect sensitive values with Ansible Vault and review the rendered configuration before applying it to production.

## Operating model

The recommended workflow is to validate changes in a pre-production environment, review the Ansible diff, apply one node at a time in an HA pair and verify routing, VPN and session state after failover.

Firewall policy should be treated as production code. Changes should be peer reviewed, tested against expected traffic and documented in the changelog.

## Configuration notes

- `nftables` renders a complete ruleset and starts with `flush ruleset`; do not share the host with another nftables manager.
- Input and forward chains receive the protective rules first, then user rules, then the final policy rules. The SSH rate limit and ICMP drops are applied last so explicit user rules can override them.
- `nftables_log_dropped: true` adds a rate-limited log line before the drop policy.
- `nftables_enabled: false` stops and disables the service instead of leaving it running.
- `network_interfaces` accept either `prefix` or `netmask`, an optional `addresses` list, `dhcp: true`, `mtu`, `dns` and a `vlans` list.
- `network_dns_servers` sets the default resolver for interfaces that do not define `dns`.
- `frr_version` is detected from the installed package unless set explicitly.
- `keepalived_track_interfaces` and `keepalived_track_scripts` add VRRP health tracking.
- `strongswan_connections` accepts optional `leftid`, `rightid`, `ikelifetime`, `lifetime`, `mobike`, `fragmentation`, `compress` and an `extra` mapping.
- WireGuard peers accept `preshared_key`, `endpoint` and `persistent_keepalive`.

## Validation

```bash
yamllint .
ansible-lint
ansible-playbook -i inventory.yml site.yml --syntax-check
molecule test -s default
```

Molecule scenarios are available for the `base`, `network`, `nftables`, `strongswan` and `wireguard` roles.

## High availability notes

In HA mode, WireGuard and strongSwan services are disabled at boot and started by the keepalived notify scripts. Configuration changes made by Ansible are applied on the next failover or manual service restart; schedule them during a maintenance window.

`conntrackd` reuses `keepalived_ha_interface` and `keepalived_ha_address` unless `conntrackd_ha_interface` and `conntrackd_ha_address` are set explicitly.

## Repository layout

```
site.yml              Main deployment playbook
inventory.yml         Example inventory
group_vars/           Shared variables
host_vars/            Host-specific variables
roles/                Firewall automation roles
website/              GitHub Pages landing page and documentation
```

## Security notes

This project is infrastructure automation, not a security certification. Review every default, restrict management access, protect secrets with Ansible Vault or an external secret manager and test the resulting policy before production use.

The repository ignores `.vault_pass`. Keep the Vault password outside the repository and provide it to CI through a secret. Sensitive values are stored inline with `!vault`.

## License

BSD 2-Clause License. See [LICENSE](LICENSE).

## Links

- [Issues](https://github.com/petrouz/muros/issues)
- [Docs and configuration](https://petrouz.github.io/ansible-debian-firewall/docs/configuration.html)
- [Changelog](CHANGELOG.md)
