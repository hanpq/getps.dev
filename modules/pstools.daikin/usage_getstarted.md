---
id: usage_getstarted
title: Get started
---

## Retreive status of a daikin device

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

## Set a mode and target temp

```powershell
Set-DaikinAirCon -HostName daikin.local.network -PowerOn:$true -Temp 19 -Mode AUTO -FanSpeed AUTO
```