---
slug: check-profile-status
title: Check-ProfileStatus
authors:
  - name: Hannes Palmquist
    title: Senior Consultant Cloud
    url: https://getps.dev/about
    image_url: https://getps.dev/img/Hannes_Profil_HighContrast.jpg
tags: [powershell, check-profilestatus, function, profile]
keywords: [powershell, check-profilestatus, function, profile]
description: This function can be used to show the status of the Powershell profile scripts on the computer.
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/check-profile-status"
data-layout="button"
data-size="small">
</div>

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

<Comments />
