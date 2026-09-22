# Changelog

All notable changes to this project are documented here.

## Unreleased

- Added structured nftables services, hosts, groups and rules
- Added support for Debian 13 and Debian 14
- Added Molecule validation for the nftables role
- Added GitHub Actions validation with yamllint, ansible-lint and syntax checks
- Added separated role-specific variable files
- Improved DNAT, WireGuard management access and HA firewall rules

## 0.1.0

- Initial Ansible firewall automation for Debian
- Added nftables, WireGuard, Keepalived, FRRouting, StrongSwan and conntrackd roles
