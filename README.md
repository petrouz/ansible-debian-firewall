# ansible-debian-firewall

[![Debian 13](https://img.shields.io/badge/Debian-13%20%7C%2014-D70A53?logo=debian&logoColor=white)](https://www.debian.org/releases/) [![Ansible](https://img.shields.io/badge/Ansible-2.15%2B-EE0000?logo=ansible&logoColor=white)](https://docs.ansible.com/) [![License](https://img.shields.io/badge/license-BSD--2--Clause-087f78.svg)](LICENSE) [![Website](https://img.shields.io/badge/website-GitHub%20Pages-1769aa)](https://petrouz.github.io/ansible-debian-firewall/)

## Roles

| Role | Responsibility |
| --- | --- |
| `base` | Chrony, rsyslog, SSH hardening, locale, unattended upgrades and SNMP |
| `network` | Interfaces, VLANs, bonds, routes, DNS and sysctl with systemd-networkd |
| `nftables` | Stateful firewall policy, NAT, optional drop logging and aliases |
| `wireguard` | WireGuard interfaces, peers and HA-aware configuration |
| `strongswan` | IPsec tunnels and authentication configuration |
| `frr` | OSPF, BGP and dynamic routing services |
| `keepalived` | VRRP virtual IP and failover management for high availability with 2 nodes |
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
