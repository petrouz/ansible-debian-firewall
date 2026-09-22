# ansible-debian-firewall

[![Debian 13](https://img.shields.io/badge/Debian-13%20%7C%2014-D70A53?logo=debian&logoColor=white)](https://www.debian.org/releases/) [![Ansible](https://img.shields.io/badge/Ansible-2.15%2B-EE0000?logo=ansible&logoColor=white)](https://docs.ansible.com/) [![License](https://img.shields.io/badge/license-BSD--2--Clause-087f78.svg)](LICENSE) [![Website](https://img.shields.io/badge/website-GitHub%20Pages-1769aa)](https://petrouz.github.io/ansible-debian-firewall/)

Production-oriented Ansible roles for building secure, auditable and reproducible Debian 13 and Debian 14 firewalls.

The project provides a complete perimeter firewall foundation based on standard Debian components. It is designed for teams that need transparent infrastructure, controlled changes and operational consistency without a proprietary appliance or opaque management layer.

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
| `base` | Chrony, rsyslog and common Debian services |
| `network` | Interfaces, VLANs, bridges, routes, sysctl and systemd-networkd |
| `nftables` | Stateful firewall policy, NAT, logging and aliases |
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
git clone git@github.com:petrouz/ansible-debian-firewall.git
cd ansible-debian-firewall
ansible-galaxy collection install -r requirements.yml
ansible-playbook -i inventory.yml site.yml
```

The inventory and variables are deliberately explicit. Keep environment-specific values in `host_vars` and `group_vars`, protect sensitive values with Ansible Vault and review the rendered configuration before applying it to production.

## Operating model

The recommended workflow is to validate changes in a pre-production environment, review the Ansible diff, apply one node at a time in an HA pair and verify routing, VPN and session state after failover.

Firewall policy should be treated as production code. Changes should be peer reviewed, tested against expected traffic and documented in the changelog.

## Repository layout

```
site.yml              Main deployment playbook
inventory.yml         Example inventory
group_vars/           Shared variables
host_vars/            Host-specific variables
roles/                Firewall automation roles
docs/                 GitHub Pages landing page
```

## Security notes

This project is infrastructure automation, not a security certification. Review every default, restrict management access, protect secrets with Ansible Vault or an external secret manager and test the resulting policy before production use.

## License

BSD 2-Clause License. See [LICENSE](LICENSE).

## Links

- [Issues](https://github.com/petrouz/ansible-debian-firewall/issues)
- [Docs and configuration](https://petrouz.github.io/ansible-debian-firewall/docs/configuration.html)
- [Changelog](CHANGELOG.md)
