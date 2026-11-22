# Changelog

All notable changes to this project are documented here.

## Unreleased

- Added structured nftables services, hosts, groups and rules
- Reworked nftables rule declarations: chain and action are inferred, `from`/`to` replace the interface keys, `rules` blocks share common matches, networks are named and DNAT expands services per port
- Added support for Debian 13 and Debian 14
- Added Molecule validation for the nftables role
- Added GitHub Actions validation with yamllint, ansible-lint and syntax checks
- Added separated role-specific variable files
- Improved DNAT, WireGuard management access and HA firewall rules
- Fixed the Debian release assertion that rejected Debian 14
- Fixed nftables rule ordering so user rules can override the default SSH and ICMP policy
- Fixed `nftables_enabled: false` so the service is stopped and disabled
- Added nftables rule validation and optional rate-limited drop logging
- Added `prefix`, `addresses`, `dhcp`, `mtu` and per-interface DNS support to the network role
- Added VLAN interface addressing and fixed multi-route generation
- Made `network_dns_servers` explicit in group variables
- Fixed keepalived `nopreempt`, added VRRP health tracking and a vaulted VRRP password
- Added conntrackd variable defaults, validation and `nf_conntrack` module loading
- Added conntrackd resynchronization to the keepalived master notify script
- Added FRR version detection, integrated config and staticd support
- Made the WireGuard HA primary selection deterministic and added peer options
- Added strongSwan optional connection parameters and PSK-only secrets generation
- Added `.ansible-lint`, fixed yamllint violations and updated the documentation

## 0.1.0

- Initial Ansible firewall automation for Debian
- Added nftables, WireGuard, Keepalived, FRRouting, StrongSwan and conntrackd roles
