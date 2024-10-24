---
id: getstarted
title: Get started
---
> :warning: **IMPORTANT**
> This module is early in it´s development phase. Many API function and features are not yet available. You are welcome to contribute on GitHub to accelerate progress further.

# PSDaikin

This project has adopted the following policies [![CodeOfConduct](https://img.shields.io/badge/Code%20Of%20Conduct-gray)](https://github.com/hanpq/PSDaikin/blob/main/.github/CODE_OF_CONDUCT.md) [![Contributing](https://img.shields.io/badge/Contributing-gray)](https://github.com/hanpq/PSDaikin/blob/main/.github/CONTRIBUTING.md) [![Security](https://img.shields.io/badge/Security-gray)](https://github.com/hanpq/PSDaikin/blob/main/.github/SECURITY.md)

## Project status
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hanpq/PSDaikin/build.yml?branch=main&label=build&logo=github)](https://github.com/hanpq/PSDaikin/actions/workflows/build.yml) [![Codecov](https://img.shields.io/codecov/c/github/hanpq/PSDaikin?logo=codecov&token=qJqWlwMAiD)](https://codecov.io/gh/hanpq/PSDaikin) [![Platform](https://img.shields.io/powershellgallery/p/PSDaikin?logo=ReasonStudios)](https://img.shields.io/powershellgallery/p/PSDaikin) [![PowerShell Gallery](https://img.shields.io/powershellgallery/dt/PSDaikin?label=downloads)](https://www.powershellgallery.com/packages/PSDaikin) [![License](https://img.shields.io/github/license/hanpq/PSDaikin)](https://github.com/hanpq/PSDaikin/blob/main/LICENSE) [![docs](https://img.shields.io/badge/docs-getps.dev-blueviolet)](https://getps.dev/modules/PSDaikin/getstarted) [![changelog](https://img.shields.io/badge/changelog-getps.dev-blueviolet)](https://github.com/hanpq/PSDaikin/blob/main/CHANGELOG.md) ![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/hanpq/PSDaikin?label=version&sort=semver) ![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/hanpq/PSDaikin?include_prereleases&label=prerelease&sort=semver)

## About

This module provides cmdlets to manage a Daikin AirCon device. These devices is equiped with a network module that provides a REST API that can be used to query status information and set configuration. This API is not documented and this module is based on the findings by "ehjortberg" and the repo <https://github.com/ael-code/daikin-control>.

This is work in progress and currently only implements two cmdlets that retreive the status and a cmdlet to set mode and temperature.

## Installation

### PowerShell Gallery

To install from the PowerShell gallery using PowerShellGet run the following command:

```powershell
Install-Module PSDaikin -Scope CurrentUser
```

## Usage

### Retreive status of a daikin device

This cmdlet will try to retreive the general current status and configuration of the aircon device.

```powershell
Get-DaikinStatus -Hostname daikin.local.network
```

Example of returned response

```
PowerOn        : True
Mode           : HEAT
TargetTemp     : 22.0
TargetHumidity : 0
FanSpeed       : AUTO
FanDirection   : Stopped
InsideTemp     : 22.0
InsideHumidity : -
OutsideTemp    : 0.0
DeviceType     : aircon
Region         : eu
Version        : 1.2.51
Revision       : D3A0C9F
Port           : 3030
Identity       : username
MACAddress     : ABCDEF123456
```

### Set a mode and target temp

```powershell
Set-DaikinAirCon -HostName daikin.local.network -PowerOn:$true -Temp 19 -Mode AUTO -FanSpeed AUTO
```

