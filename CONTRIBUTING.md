# Contributing

## Requirements

- ansible-lint
- yamllint

## Before submitting

```bash
ansible-lint
yamllint -d relaxed .
ansible-playbook -i inventory.yml site.yml --syntax-check
```

## Role structure

Each role must:
- Have a `defaults/main.yml` with all variables documented
- Have a `meta/main.yml` with author, description and license
- Be idempotent
- Pass ansible-lint with no violations
- Support both standalone and HA modes when applicable
