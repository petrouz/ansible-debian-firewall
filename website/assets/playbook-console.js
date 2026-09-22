(() => {
  const target = document.getElementById("playbook-console");
  if (!target) return;
  const lines = [
    ["$ ansible-playbook -i inventory.yml site.yml --diff", "text-slate-300"],
    ["", "text-slate-300"],
    ["PLAY [Deploy Ansible Debian Firewall]", "text-cyan-300"],
    ["", "text-slate-300"],
    ["TASK [Gathering Facts]", "text-cyan-300"],
    ["ok: [fw1]", "text-emerald-300"],
    ["ok: [fw2]", "text-emerald-300"],
    ["", "text-slate-300"],
    ["TASK [base : Install common Debian packages]", "text-cyan-300"],
    ["changed: [fw1] => chrony, rsyslog, unattended-upgrades", "text-yellow-300"],
    ["changed: [fw2] => chrony, rsyslog, unattended-upgrades", "text-yellow-300"],
    ["TASK [base : Harden SSH and enable local logging]", "text-cyan-300"],
    ["changed: [fw1] => sshd_config, /var/log/syslog", "text-yellow-300"],
    ["changed: [fw2] => sshd_config, /var/log/syslog", "text-yellow-300"],
    ["TASK [base : Configure unattended security upgrades]", "text-cyan-300"],
    ["ok: [fw1] => reboot disabled", "text-emerald-300"],
    ["ok: [fw2] => reboot disabled", "text-emerald-300"],
    ["TASK [base : Set hostname and time synchronization]", "text-cyan-300"],
    ["changed: [fw1] => fw1, chrony", "text-yellow-300"],
    ["changed: [fw2] => fw2, chrony", "text-yellow-300"],
    ["TASK [base : Install SNMP and firewall monitoring]", "text-cyan-300"],
    ["ok: [fw1]", "text-emerald-300"],
    ["ok: [fw2]", "text-emerald-300"],
    ["", "text-slate-300"],
    ["TASK [network : Configure interfaces, VLANs and LACP]", "text-cyan-300"],
    ["changed: [fw1] => systemd-networkd, VLAN 10, bond0", "text-yellow-300"],
    ["changed: [fw2] => systemd-networkd, VLAN 10, bond0", "text-yellow-300"],
    ["TASK [network : Apply addresses and default routes]", "text-cyan-300"],
    ["ok: [fw1] => eth0, eth1, bond0.10", "text-emerald-300"],
    ["ok: [fw2] => eth0, eth1, bond0.10", "text-emerald-300"],
    ["TASK [network : Enable forwarding and kernel networking]", "text-cyan-300"],
    ["changed: [fw1] => net.ipv4.ip_forward=1", "text-yellow-300"],
    ["changed: [fw2] => net.ipv4.ip_forward=1", "text-yellow-300"],
    ["TASK [network : Check link state and MTU]", "text-cyan-300"],
    ["ok: [fw1] => all links up", "text-emerald-300"],
    ["ok: [fw2] => all links up", "text-emerald-300"],
    ["", "text-slate-300"],
    ["TASK [nftables : Apply firewall policy and NAT]", "text-cyan-300"],
    ["changed: [fw1] => nft -c validation passed", "text-yellow-300"],
    ["changed: [fw2] => nft -c validation passed", "text-yellow-300"],
    ["TASK [nftables : Create named address and port sets]", "text-cyan-300"],
    ["ok: [fw1] => public_web, mail_servers", "text-emerald-300"],
    ["ok: [fw2] => public_web, mail_servers", "text-emerald-300"],
    ["TASK [nftables : Install input and forward policies]", "text-cyan-300"],
    ["changed: [fw1] => policy drop", "text-yellow-300"],
    ["changed: [fw2] => policy drop", "text-yellow-300"],
    ["TASK [frr : Configure OSPF and install routes]", "text-cyan-300"],
    ["ok: [fw1] => ospfd neighbors=1", "text-emerald-300"],
    ["ok: [fw2] => ospfd neighbors=1", "text-emerald-300"],
    ["TASK [frr : Enable BFD and verify convergence]", "text-cyan-300"],
    ["ok: [fw1] => bfd sessions=1", "text-emerald-300"],
    ["ok: [fw2] => bfd sessions=1", "text-emerald-300"],
    ["TASK [frr : Save routing daemon configuration]", "text-cyan-300"],
    ["changed: [fw1] => /etc/frr", "text-yellow-300"],
    ["changed: [fw2] => /etc/frr", "text-yellow-300"],
    ["", "text-slate-300"],
    ["TASK [wireguard : Configure VPN peers]", "text-cyan-300"],
    ["ok: [fw1]", "text-emerald-300"],
    ["ok: [fw2]", "text-emerald-300"],
    ["TASK [wireguard : Install kernel module and tools]", "text-cyan-300"],
    ["ok: [fw1]", "text-emerald-300"],
    ["ok: [fw2]", "text-emerald-300"],
    ["TASK [wireguard : Write interface and peer configuration]", "text-cyan-300"],
    ["changed: [fw1] => wg0 peers=4", "text-yellow-300"],
    ["changed: [fw2] => wg0 peers=4", "text-yellow-300"],
    ["", "text-slate-300"],
    ["TASK [strongswan : Configure IPsec tunnels]", "text-cyan-300"],
    ["changed: [fw1] => 2 tunnels ready", "text-yellow-300"],
    ["changed: [fw2] => 2 tunnels ready", "text-yellow-300"],
    ["", "text-slate-300"],
    ["TASK [keepalived : Configure VRRP failover]", "text-cyan-300"],
    ["ok: [fw1] state=MASTER", "text-emerald-300"],
    ["ok: [fw2] state=BACKUP", "text-emerald-300"],
    ["TASK [conntrackd : Synchronize connection states]", "text-cyan-300"],
    ["ok: [fw1] synchronized", "text-emerald-300"],
    ["ok: [fw2] synchronized", "text-emerald-300"],
    ["", "text-slate-300"],
    ["PLAY RECAP", "text-cyan-300"],
    ["fw1 : ok=58 changed=12 unreachable=0 failed=0", "text-yellow-300"],
    ["fw2 : ok=57 changed=9 unreachable=0 failed=0", "text-yellow-300"],
  ];
  let index = 0;
  let output = [];
  const render = () => {
    if (index >= lines.length) return;

    const [line, color] = lines[index];
    output.push(`<span class="${color}">${line.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</span>`);
    target.innerHTML = output.join("\n");
    target.scrollTop = target.scrollHeight;
    index += 1;
    if (index < lines.length) {
      window.setTimeout(render, 500);
    }
  };

  render();

})();
