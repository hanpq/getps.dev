---
id: quickstart
title: Quick start
---

# What is pstools.psscriptinfo

This module lets you update and manage a PSScriptInfo block at the beginning of each script file. This can be used keep track of version specific information about the script. Examples of information to keep in the PSScriptInfo block could be version, unique guid, tags, date created, date updated, changelog, release note, copyright, links to license, project, docs etc.

The PSScriptInfo block is wrapped with the following script block tags "<#PSScriptInfo" and "PSScriptInfo#>". The content within the block is in JSON format for easy parsing and manual updating.

```powershell
<#PSScriptInfo
{
    "Version" : "1.0.0.0",
    "GUID" : "a3002a7c-0870-4b5f-8bed-cd31f7f23432",
    "DateCreated" : "2021-03-29",
    "DateUpdated" : "2021-03-30",
    "ProjectSite" : "https://getps.dev"
}
PSScriptInfo#>

param (
    $param1,
    $param2
)
```

