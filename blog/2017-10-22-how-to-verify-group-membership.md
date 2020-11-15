---
slug: how-to-verify-group-membership
title: How to verify group membership
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'img/Hannes_Profil_HighContrast.jpg'
author_url: https://netlify.getps.dev/about
tags: [powershell, check-profilestatus, function, profile]
---

This function can be used to show the status of the Powershell profile scripts on the computer.

```powershell
function Check-ProfileStatus { 
   ($profile | Get-Member -MemberType NoteProperty).Name | 
   ForEach-Object { 
      $CurrentProfile = $_
      $path = $profile.$_
      [pscustomobject]([Ordered]@{Profile=$CurrentProfile;Path=$Path;Exists=(Test-Path $Path)})
    } 
} 
 
Check-ProfileStatus
```