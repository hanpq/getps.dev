---
id: generate_sids
title: Generate SIDs
---

# How to generate SIDs for domain and local identities

Use the below command to create a SID object for a domain user

```powershell
$sid = (New-Object -TypeName Security.Principal.NTAccount -ArgumentList ('mydomain', 'User01')).Translate([Security.Principal.SecurityIdentifier]).Value
```

Use the below command to create a SID object for a local user

```powershell
$sid = (New-Object -TypeName Security.Principal.NTAccount -ArgumentList ('computer01', 'User01')).Translate([Security.Principal.SecurityIdentifier]).Value
```

<Comments />
