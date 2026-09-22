# Security Policy

## Scope

This repository contains Ansible roles for deploying Debian firewalls. Security reports are relevant when a role, template, task or default can cause an unintended impact on:

- firewall filtering or NAT;
- network isolation or routing;
- SSH access or privilege boundaries;
- VPN authentication or tunnel confidentiality;
- secrets handling;
- high availability or failover behavior;
- the security of generated Debian services.

This policy covers the Ansible roles and their generated configuration. It does not cover vulnerabilities in Debian, Ansible, external collections or customer-specific inventories.

## Reporting a vulnerability

Do not report security vulnerabilities in public issues or pull requests.

Send a private report to the repository maintainers with:

- the affected role, task, template or variable;
- the Debian version and Ansible context;
- reproduction steps or a proof of concept;
- the expected and actual behavior;
- the potential impact and any suggested mitigation.

The maintainers will acknowledge the report, assess its impact and coordinate remediation with the reporter.

Do not include real customer data, private keys, passwords, Vault passwords or unredacted inventories in a report.

## Supported code

Security fixes are applied to the current `main` branch. There are currently no published releases or versioned support branches.
