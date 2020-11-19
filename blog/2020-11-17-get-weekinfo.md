---
slug: get-weekinfo
title: Get-WeekInfo
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'img/Hannes_Profil_HighContrast.jpg'
author_url: https://netlify.getps.dev/about
tags: [Powershell, week, function]
---

In some parts of the world it is more common to work with weeks as measurement of time. Unfortunately there are not easy accessible ways to work with weeks in powershell or .NET. There is some support of retrieving a week number with the culture datatype however if you have a week number and want to resolve dates relatated to that week number you have to resolve that manually. Here is one example of how to do it.

First we define a supporting function that simply retreives the week number for a given date from the Gregorian calendar.

```powershell
function Get-CalendarWeek {
    <#
    .DESCRIPTION
        Gets the current week number based on a specific culture and it's week number descision rules.
    .PARAMETER Date
        Defines the date at which to return the week number for. Defaults to the current date.
    .PARAMETER CultureInfo
        Defines the culture that should be used to calculate the week number. Defaults to se-SV.
    .EXAMPLE
        Get-CalendarWeek
        Get the week number for the current date.
    .EXAMPLE
        Get-CalendarWeek -Date 2018-01-25 -CultureInfo en-US
        Get the week number for the date 2018-01-25 according to the week number calculation rules of the en-US culture.
    .NOTES
        Author: Hannes Palmquist
        AuthorEmail: hannes.palmquist@outlook.com
        COPYRIGHT: © 2019, Hannes Palmquist, All Rights Reserved
    #>
    param(
        [datetime]$Date = (Get-Date),
        [string]$CultureInfo = $PSCulture
    )

    # Get specific culture object
    $Culture = [cultureinfo]::GetCultureInfo($CultureInfo)

    # retrieve calendar week
    write-output $Culture.Calendar.GetWeekOfYear($Date, $Culture.DateTimeFormat.CalendarWeekRule, $Culture.DateTimeFormat.FirstDayOfWeek)
}
```

When we have that function we can define the function that can resolve the week.

```powershell
function Get-WeekInfo {
    <#
    .DESCRIPTION
        Gets info about a specific week
    .PARAMETER Week
        Defines the week number to query
    .PARAMETER Year
        Defines which year to query
    .EXAMPLE
        Get-WeekInfo -Week 5 -Year 1988
        Gets the first date of the fifth week of 1988
    .NOTES
        Author: Hannes Palmquist
        AuthorEmail: hannes.palmquist@outlook.com
        Copyright: (c) 2019, Hannes Palmquist, All Rights Reserved
    #>

    [CmdletBinding()] # Enabled advanced function support
    param(
        [Parameter(Mandatory)][ValidateRange(1, 53)][int]$Week,
        [Parameter(Mandatory)][ValidateRange(1600, 2100)][int]$Year
    )

    BEGIN {
        $WeekHash = [ordered]@{
            Week = $Week
            Year = $Year
        }
    }

    PROCESS {
        $ReferenceDate              = Get-Date -Year $Year -Month 02 -Date 05
        $ReferenceWeek              = Get-CalendarWeek -Date $ReferenceDate
        $WeeksDiff                  = $Week - $ReferenceWeek
        $DateInWeek                 = $ReferenceDate.AddDays($WeeksDiff * 7)
        $WeekHash.FirstDateOfWeek   = $DateInWeek.AddDays(1 - [int]$DateInWeek.DayOfWeek)
        $WeekHash.LastDateOfWeek    = $WeekHash.FirstDateOfWeek.AddDays(7).AddMilliseconds(-1)
        $WeekHash.StartsInMonth     = ([cultureinfo]::GetCultureInfo($PSCulture)).DateTimeFormat.MonthNames[($WeekHash.FirstDateOfWeek).Month-1]
        $WeekHash.EndsInMonth       = ([cultureinfo]::GetCultureInfo($PSCulture)).DateTimeFormat.MonthNames[($WeekHash.LastDateOfWeek).Month-1]
    }

    END {
        Write-Output ([pscustomobject]$WeekHash)
    }
}
```

This will allow us to perform queries like:

```powershell
Get-WeekInfo -Week 30 -Year 2018

Week            : 30
Year            : 2018
FirstDateOfWeek : 2018-07-23 00:00:00
LastDateOfWeek  : 2018-07-29 23:59:59
StartsInMonth   : July
EndsInMonth     : July
```
