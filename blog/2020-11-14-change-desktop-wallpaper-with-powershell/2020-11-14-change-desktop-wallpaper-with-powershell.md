---
slug: change-desktop-wallpaper-with-powershell
title: Change desktop wallpaper with powershell
authors: hanpq
tags: [Powershell]
keywords: [powershell, Set-DesktopWallpaper, function, wallpaper]
description: I’ve seen numerous forums and blog articles trying to to change desktop wallpaper in windows, none of which works reliably.
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/change-desktop-wallpaper-with-powershell"
data-layout="button"
data-size="small">
</div>

I’ve seen numerous forums and blog articles trying to to change desktop wallpaper in windows, none of which works reliably. The most common solution is to set a new registry keys and then call user32.dll and the method UpdatePerUserSystemParameters and then quite literally hope that the desktop wallpaper changes. This is not always the case because Windows does not always honor the request to actually update the wallpaper settings when this method is called. The inner working of this method is not completely known and this method has never been advertised by Microsoft to be the way to change wallpaper.

However I came to the conclusion that it must exist a documented windows API to actually set a new wallpaper so I started looking into C# solutions to the same problem and sure thing it was a quite an easy procedure to change the desktop wallpaper. All I had to do was to define the type definition in Powershell and then pass the action values when calling the SystemParametersInfo method.

The below Powershell function will reliably change the desktop wallpaper and you also have the possibility to choose the style.

```powershell
<#PSScriptInfo
    .VERSION 1.0.0.0
    .GUID cfc2e719-67d8-4722-b594-3d198a1206c7
    .FILENAME Set-DesktopWallpaper.ps1
#>
function Set-DesktopWallpaper {
    <#
    .DESCRIPTION
        Sets a desktop background image
    .PARAMETER PicturePath
        Defines the path to the picture to use for background
    .PARAMETER Style
        Defines the style of the wallpaper. Valid values are, Tiled, Centered, Stretched, Fill, Fit, Span
    .EXAMPLE
        Set-DesktopWallpaper -PicturePath "C:\pictures\picture1.jpg" -Style Fill
    .EXAMPLE
        Set-DesktopWallpaper -PicturePath "C:\pictures\picture2.png" -Style Centered
    .NOTES
        Supports jpg, png and bmp files.
    #>

    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][String]$PicturePath,
        [ValidateSet('Tiled', 'Centered', 'Stretched', 'Fill', 'Fit', 'Span')]$Style = 'Fill'
    )


    BEGIN {
        $Definition = @"
[DllImport("user32.dll", EntryPoint = "SystemParametersInfo")]
public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
"@

        Add-Type -MemberDefinition $Definition -Name Win32SystemParametersInfo -Namespace Win32Functions
        $Action_SetDeskWallpaper = [int]20
        $Action_UpdateIniFile = [int]0x01
        $Action_SendWinIniChangeEvent = [int]0x02

        $HT_WallPaperStyle = @{
            'Tiles'     = 0
            'Centered'  = 0
            'Stretched' = 2
            'Fill'      = 10
            'Fit'       = 6
            'Span'      = 22
        }

        $HT_TileWallPaper = @{
            'Tiles'     = 1
            'Centered'  = 0
            'Stretched' = 0
            'Fill'      = 0
            'Fit'       = 0
            'Span'      = 0
        }

    }


    PROCESS {
        Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name wallpaperstyle -Value $HT_WallPaperStyle[$Style]
        Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name tilewallpaper -Value $HT_TileWallPaper[$Style]
        $null = [Win32Functions.Win32SystemParametersInfo]::SystemParametersInfo($Action_SetDeskWallpaper, 0, $PicturePath, ($Action_UpdateIniFile -bor $Action_SendWinIniChangeEvent))
    }
}
```

<Comments />
