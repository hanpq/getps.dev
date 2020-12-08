---
slug: setup-active-directory-one-way-trust-with-selective-authentication
title: Setup Active Directory One-way Trust With Selective Authentication
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'https://getps.dev/img/Hannes_Profil_HighContrast.jpg'
author_url: https://getps.dev/about
tags: [Active Directory, Trust]
description: Setting up a one-way trust with selective authentication and without DNS conditional forward
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/setup-active-directory-one-way-trust-with-selective-authentication"
data-layout="button"
data-size="small">
</div>

One of the things I often help clients with is to setup Active Directory Forest Trusts. If the trust can be setup as “Forest trust”, “Two-way”, “Forest-wide auth”, “conditional forward for DNS”, “no firewall” anyone can manage to setup a forest trust. In reality though it rarely is that simple. Recently I was asked to setup a trust in a more complex scenario.

- Forest trust
- One-way
- Selective Authentication
- No AD DNS (Third party DNS in both organizations).
  - Not allowed to setup a stub zone or conditional forward
- And last but not least a very strict security team that was not so keen on opening all port required for the AD trust.

## Scenario and definitions

The scenario came from the acquisition of another company and during the consolidation of the two organization the trust was setup so that the migrated users could access a few legacy systems until all resources was migrated. In the table below the scenario is defined.

Property | Forest A | Forest B
--- | --- | ---
Containing|Users| Resources
Trust Direction | Incoming | Outgoing
Trust | Trusted | Trusting
Direction of Access | -> |
Direction of Trust | <- |

## Configure trust options

For forest trust authentication there is two options. Selective Authentication and Forest-wide authentication. With forest-wide authentication the trusting forest will allow all authentication requests to authenticate. This means that all users in the trusted forest can authenticate in the trusting forest. This also means that all users in the trusted forest implicitly is added to the “Authenticated Users” group in AD. This is not always desirable. Sometimes common file shares has “authenticated users” as an permission group (which is of course is bad). Authenticated users are also granted some read permissions in Active Directory by default. This means that you can enumerate users and quite a lot or their attributes.

To mitigate this the authentication method “Selective Authentication” exists. This mode will deny all authentication requests by default. This means that for a user from the trusted forest to authenticate to a resource, that user needs to be granted the “Allowed to authenticate” permission on the resources active directory computer object. This allows us to control which users can authenticate, to which resource in addition to the standard permission for the resource itself.

In this scenario “Selective Authentication” is selected.

## Configure network port openings

Most likely there is a firewall between the two organizations and active directory by nature uses a lot of different ports for different type of communication. There are many blogs, articles that try to summarize whats ports are needed for a forest trust but all of them manage to include a lot of ports that are often not needed or for specific scenarios or types of trusts. In our scenario I didn’t want to order port openings that I couldn’t motivate that we needed in this specific case. Below is a list of the ports that I ended up with a bare minimum to setup the a working trust according to our requirements.

:::important

Note that even though the trust is one-way does not mean that the communication is. These ports needs to be opened from domain controllers in ForestA to domain controllers in ForestB and vice versa

:::

Port|Protocol|Service|Description|Type
---|---|---|---|---
88|TCP|Kerberos|Used for DC Auth|Mandatory
88|UDP|Kerberos|Used for DC Auth|Mandatory
135|TCP|RPC Endpoint Mapper|Used to establish a RPC endpoint|Mandatory
389|TCP|LDAP|Used for LDAP comm|Mandatory
389|UDP|LDAP|Used for LDAP comm|Mandatory
455|TCP|SMB|Used for trust establishment. Can be removed post trust configuration.| Mandatory during setup
1024-65535|TCP|RPC|RPC High ports returned by RPC Endpoint mapper|Mandatory

## Configure DNS records

Often DNS can be configured by just setting up a AD DNS conditional forward for the other forest. This will allow all necessary DNS records to be resolved by the respective forest. In this scenario though we were not allowed to do that and instead create the DNS records manually. Almost no documentation exists for this scenario so here comes the least amount of DNS records required to successfully set up the forest trust.

### A-records

Name|Target
---|---
domain.com|DC1-IP
domain.com|DC2-IP
domain.com|DC3-IP
DC1.domain.com|DC1-IP
DC2.domain.com|DC2-IP
DC3.domain.com|DC3-IP

Notes

- All domain controllers that should serve the trust needs to be added as A records.
- Make sure that the KDC and PDC are among these domain controllers.

### SRV-records

- Subdomain “_msdcs” of “domain.com” needs to be created
- Subdomain “dc” of domain “_msdcs.domain.com” needs to be created
- Subdomain “pdc” of domain “_msdcs.domain.com” needs to be created if both sides of the forest trust should be created from one of the sides.
- Note the trailing “.” (period) of the host names

Full name|Service|Protocol|Port|Priority|Weight|Host
---|---|---|---|---|---|---
_ldap._tcp.dc_msdcs.domain.com|_ldap|_tcp|389|0|100|DC1.domain.com
_ldap._tcp.dc_msdcs.domain.com|_ldap|_tcp|389|0|100|DC2.domain.com
_ldap._tcp.dc_msdcs.domain.com|_ldap|_tcp|389|0|100|DC3.domain.com
_kerberos._tcp.dc._msdcs.domain.com|_kerberos|_tcp|88|0|100|DC1.domain.com
_kerberos._tcp.dc._msdcs.domain.com|_kerberos|_tcp|88|0|100|DC2.domain.com
_kerberos._tcp.dc._msdcs.domain.com|_kerberos|_tcp|88|0|100|DC3.domain.com
_ldap._tcp.pdc._msdcs.domain.com|_ldap|_tcp|389|0|100|DC1.domain.com(PDC domain controller)

If conditional forwards are used, make sure that all domain controllers that are resolvable are added with port openings and that they are reachable.

## Other notes

- Make sure that all clients where users from ForestA can reach the domain controllers published in DNS for ForestB.
- Use PortQry to test all ports from all domain controllers.
  - Note that 88:UDP don’t give any response so that port cannot be tested.
- This guide focus on establishing the trust between two forests. The following topics are out-of-scope and subject for a future post.
  - Port openings for client computers and resource services.
  - Configuration of permissions to authenticate through the trust.
  - Configuration of permissions to access resources in ForestB.
