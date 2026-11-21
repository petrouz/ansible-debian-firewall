from __future__ import absolute_import, division, print_function

__metaclass__ = type


def netmask_to_prefix(value):
    try:
        octets = [int(part) for part in str(value).split(".")]
    except (TypeError, ValueError):
        raise ValueError("invalid IPv4 netmask: %s" % value)
    if len(octets) != 4 or any(octet < 0 or octet > 255 for octet in octets):
        raise ValueError("invalid IPv4 netmask: %s" % value)
    bits = "".join(format(octet, "08b") for octet in octets)
    if "01" in bits:
        raise ValueError("non-contiguous IPv4 netmask: %s" % value)
    return bits.count("1")


class FilterModule(object):
    def filters(self):
        return {"netmask_to_prefix": netmask_to_prefix}
