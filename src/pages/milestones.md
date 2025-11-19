---
id: milestones
title: Milestones
---

import "@site/src/css/timeline.css";

Below is summary of milestones in the context of modules, news, and announcements made on getps.dev.

<ol class="timeline-container">

<li data-date="Oct 2024">

## PSMQTT 

[Blog post](/blog/new-module-psmqtt)

PSMQTT reached 40 000 downloads on PSGallery in less than a year!

 - [Get started](/modules/PSMQTT)

</li>

<li data-date="Dec 2023">

## PSImmich

[Blog post](/blog/new-module-psimmich)

Powershell module PSImmich published.

 - [Get started](/modules/PSImmich)
 - A powershell wrapper for the Immich REST API.

</li>

<li data-date="Dec 2023">

## PSMQTT

[Blog post](/blog/new-module-psmqtt)

Powershell module PSMQTT published.

 - [Get started](/modules/PSMQTT)
 - A powershell implementation to submit and subscribe to messages to/from a MQTT broker.
 - Uses the M2MQTT library.

</li>

<li data-date="Sep 2023">

## PSLogs

No link

Powershell module PSLogs published.

 - [Get started](/modules/PSLogs)
 - A logging module with a plugin system for logging targets. Each logging operation is executed in a separate thread reducing impact on script execution.
 - Forked of the original module Logging.

</li>

<li data-date="Jan 2023">

## PSDev

No link

Powershell module PSDev published.

 - [Get started](/modules/PSDev)
 - My personal tools modules where a I store various powershell functions and tools.

</li>

<li data-date="Dec 2022">

## PSScriptInfo

No link

Powershell module PSScriptInfo published.

 - [Get started](/modules/PSScriptInfo)
 - Powershell module containing tools to add/update/remove a comment based header to powershell script files.

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
```

Update scriptinfo

```powershell
Add-PSScriptInfo -FilePath C:\Script\File.ps1 -Properties @{
    Version = "1.0.0.0"
    DateCreated = "2021-03-30"
}
```

</li>

<li data-date="Dec 2022">

## PSDaikin

No link

Powershell module PSDaikin published.

 - [Get started](/modules/PSDaikin)
 - Powershell module containing tools to control a Daikin device locally.

</li>

<li data-date="Dec 2022">

## PSDataset

No link

Powershell module PSDataset published.

 - [Get started](/modules/PSDataSet)
 - Powershell wrapper for the .Net classes System.Collections.Dataset
 - Datasets are in memory data structures like tables.

</li>

<li data-date="Dec 2022">

## PSSort

No link

Powershell module PSSort published.

 - [Get started](/modules/PSSort)
 - Hobby project for implementing different sorting algorithms in powershell. Only meant to be a fun and educational project rather than performant tool event though I try to be as efficient as powershell allows me to be within the scope of powershell code.

</li>

<li data-date="Nov 2022">

## PSPortainer

[Blog post](/blog/announcing-psportainer)

Powershell module PSPortainer published.

 - [Get started](/modules/PSPortainer)
 - Powershell wrapper for the Portainer REST API.

</li>

<li data-date="Feb 2021">

## PSQueue

[Blog post](/blog/ps-tools-queue-module)

Powershell module PSQueue published.

 - [Get started](/modules/PSQueue)
 - Powershell wrapper for the .Net classes System.Collections.Queue
 - Added functionality for performance monitoring, like queue item velocity.

</li>
<li data-date="Dec 2020" class="no-children">

## Website getps.dev launched

[Site](https://getps.dev)

</li>
</ol>
