---
slug: convert-datestringtodatetimeobject
title: Convert-DateStringToDateTimeObject
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'https://getps.dev/img/Hannes_Profil_HighContrast.jpg'
author_url: https://getps.dev/about
tags: [powershell, datetime, function]
description: Eventually you will stumble upon badly formatted date/time strings that you need to parse. Instead of doing a lot of Split, Trim, Substring and what not you can leverage the DateTime class methods Parse/TryParse/ParseExact.
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/convert-datestringtodatetimeobject"
data-layout="button"
data-size="small">
</div>

Eventually you will stumble upon badly formatted date/time strings that you need to parse. Instead of doing a lot of Split, Trim, Substring and what not you can leverage the DateTime class methods Parse/TryParse/ParseExact. To PS-ify the use of this method I wrote this powershell function that can take any date/time string and convert it to either a DateTime object or a new string format.

```powershell
function Convert-DateStringToDateTimeObject {
    <#
    .DESCRIPTION
        Parses a datetimestring with a defined pattern to a datetime object
    .PARAMETER DateString
        Defines the string to parse
    .PARAMETER PatternIn
        Defines the pattern that datestring is formatted in
    .PARAMETER PatternOut
        Optional. If this parameter is omitted a standard datetime object is
        returned. It is however possible to define an output pattern where
        the datetime object is converted back to a string but with the output
        pattern instead.
    .PARAMETER Culture
        Defines to culture to use for conversion. Default is console default ($PSCulture)
    .EXAMPLE
        $InputString = '2018_06_11_11_05_03'
        Convert-DateStringToDateTimeObject -DateString $InputString -PatternIn
        'yyyy_MM_dd_HH_mm_ss' -PatternOut 'yyyy-MM-dd HH:mm:ss'
        Convert the string date time representation '2018_06_11_11_05_03' to a
        valid datetime object and formats that datetime object to a new string format.
    .NOTES
        AUTHOR Hannes Palmquist
        AUTHOREMAIL hannes.palmquist@outlook.com
        COPYRIGHT © 2019, Hannes Palmquist, All Rights Reserved
    #>
    param(
        [Parameter(Mandatory)][string]$DateString,
        [Parameter(Mandatory)][string]$PatternIn,
        [string]$PatternOut = '',
        [string]$Culture = $PSCulture
    )

    $DateTimeFormat = [cultureinfo]::GetCultureInfo($Culture).DateTimeFormat

    $DateTimeObject = [DateTime]::ParseExact($DateString, $PatternIn, $DateTimeFormat)

    if ($PatternOut -eq '') {
        Write-Output $DateTimeObject
    } else {
        Write-Output $DateTimeObject.ToString($PatternOut)
    }
}
```

So if we have a date/time string like “2018_06_11_11_05_03” we can convert that date time to a date time object by writing:

```powershell
Convert-DateTimeStringToDateTimeObject -InputString "2018_06_11_11_05_03" -PatternIn "yyyy_MM_dd_HH_mm_ss"
11 juni 2018 11:05:03
```

You can also use the parameter “PatternOut” to set a specific format to return the DateTime object as.

Note that “\” (backslash) and “:” (semi-colon) needs to be escaped.

<Comments />
