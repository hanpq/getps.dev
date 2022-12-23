---
slug: find-office365-url-and-ip
title: Find Office 365 URL and IP
authors:
  - name: Hannes Palmquist
    title: Senior Consultant Cloud
    url: https://getps.dev/about
    image_url: https://getps.dev/img/Hannes_Profil_HighContrast.jpg
tags: [powershell,office365,office 365,api,ip,url,psdev]
keywords: [powershell,office365,office 365,api,ip,url,psdev]
description: Script to get office 365 url and ip
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/cleanup-github-artifacts"
data-layout="button"
data-size="small">
</div>

# PSDev Module

Recently i published a new module PSDev with the purpose to group together a set of utility functions. Most of the functions are stand-alone and can be used independently of the module. The module is published to PSGallery for ease of access.

```powershell
Install-Module PSDev -Scope CurrentUser
```

[PSDev Module Docs](https://getps.dev/modules/PSDev/getstarted)

## Function: Get-Office365IPURL

The first addition to the module is the Get-Office365IPURL and Test-Office365IPURL functions. These functions simplify the process of getting a list of firewall rules for a given set of services and troubleshoot communication issues.

Get-Office365IPURL is used to get a detailed list of the rules. The Office 365 website combines, protocol, port and type of openings. This function will expand these rules based on these attributes. See the example below.

```powershell
Get-Office365IPURL -Services Exchange -Types IP4,URL | Where-Object {$_.Required -eq $true}

Group                Service  Type Protocol Port Endpoint                           Required
-----                -------  ---- -------- ---- --------                           --------
Exchange_TCP_25_IP   Exchange IP4  TCP      25   52.100.0.0/14                      True
Exchange_TCP_25_IP   Exchange IP4  TCP      25   104.47.0.0/17                      True
Exchange_TCP_25_IP   Exchange IP4  TCP      25   40.107.0.0/16                      True
Exchange_TCP_25_IP   Exchange IP4  TCP      25   40.92.0.0/15                       True
Exchange_TCP_443_IP  Exchange IP4  TCP      443  40.96.0.0/13                       True
Exchange_TCP_443_IP  Exchange IP4  TCP      443  204.79.197.215/32                  True
Exchange_TCP_25_URL  Exchange URL  TCP      25   *.mail.protection.outlook.com      True
...

```

[Get-Office365IPURL Docs](https://getps.dev/modules/PSDev/commands/Get-Office365IPURL)

## Function: Test-Office365IPURL

Test-Office365IPURL is used to test weather a IP address is included within the ipranges provided by Microsoft. This could be useful of the firewall logs shows that a connection to an IP adress is blocked and there is a need to verify if that IP belongs to the ranges provided by Microsoft. See the example below.

```powershell

Test-Office365IPURL -IP 52.109.76.22 | Where-Object {$_.ismember -eq $true} | Format-Table

RuleID ServiceArea TCPPort UDPPort Required Range         Subject      IsMember
------ ----------- ------- ------- -------- -----         -------      --------
    46 Common      80,443              True 52.108.0.0/14 52.109.76.22     True
    64 Common      443                 True 52.108.0.0/14 52.109.76.22     True
    65 Common      80,443              True 52.108.0.0/14 52.109.76.22     True

```

[Test-Office365IPURL Docs](https://getps.dev/modules/PSDev/commands/Test-Office365IPURL)

<Comments />
