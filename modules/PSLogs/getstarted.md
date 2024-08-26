---
id: getstarted
title: Get started
---
# PSLogs

This project has adopted the following policies [![CodeOfConduct](https://img.shields.io/badge/Code%20Of%20Conduct-gray)](https://github.com/hanpq/PSLogs/blob/main/.github/CODE_OF_CONDUCT.md) [![Contributing](https://img.shields.io/badge/Contributing-gray)](https://github.com/hanpq/PSLogs/blob/main/.github/CONTRIBUTING.md) [![Security](https://img.shields.io/badge/Security-gray)](https://github.com/hanpq/PSLogs/blob/main/.github/SECURITY.md)

## Project status
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hanpq/PSLogs/build.yml?branch=main&label=build&logo=github)](https://github.com/hanpq/PSLogs/actions/workflows/build.yml) [![Codecov](https://img.shields.io/codecov/c/github/hanpq/PSLogs?logo=codecov&token=qJqWlwMAiD)](https://codecov.io/gh/hanpq/PSLogs) [![Platform](https://img.shields.io/powershellgallery/p/PSLogs?logo=ReasonStudios)](https://img.shields.io/powershellgallery/p/PSLogs) [![PowerShell Gallery](https://img.shields.io/powershellgallery/dt/PSLogs?label=downloads)](https://www.powershellgallery.com/packages/PSLogs) [![License](https://img.shields.io/github/license/hanpq/PSLogs)](https://github.com/hanpq/PSLogs/blob/main/LICENSE) [![docs](https://img.shields.io/badge/docs-getps.dev-blueviolet)](https://getps.dev/modules/PSLogs/getstarted) [![changelog](https://img.shields.io/badge/changelog-getps.dev-blueviolet)](https://github.com/hanpq/PSLogs/blob/main/CHANGELOG.md) ![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/hanpq/PSLogs?label=version&sort=semver) ![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/hanpq/PSLogs?include_prereleases&label=prerelease&sort=semver)

## About

PSLogs is a fork of the [Logging][module] module created by [Massimo Bonvicini][github]. Sadly the project is no longer maintained. In the readme in the original repo the author encourages people to reach out to become the owner of the repo so that it can continue to be developed. I've done this but have not gotten any response. Therefor I have forked the project to continue development of the module.

There are a number of logging modules out there, most of them are quite simple and performs the task of logging to console and file very well. What is different with this module (that I really like) is that the logging target is split up into plugins. Of course there is console and file but a number of other targets like elastic search, email, slack, teams, winevent etc. 

I've written a couple of targets myself like SQLite and GELF.

Another reason I really like this logging module is that the logging is disconnected from the script that requests logs to be written. The logging is performed in another thread and therefore the execution of the main script is much less impacted by each logging operation.

## Installation

### PowerShell Gallery

To install from the PowerShell gallery using PowerShellGet run the following command:

```powershell
Install-Module PSLogs -Scope CurrentUser
```

# Usage

## TL;DR

```powershell
Set-LoggingDefaultLevel -Level 'WARNING'
Add-LoggingTarget -Name Console
Add-LoggingTarget -Name File -Configuration @{Path = 'C:\Temp\example_%{+%Y%m%d}.log'}

$Level = 'DEBUG', 'INFO', 'WARNING', 'ERROR'
foreach ($i in 1..100) {
    Write-Log -Level ($Level | Get-Random) -Message 'Message n. {0}' -Arguments $i
    Start-Sleep -Milliseconds (Get-Random -Min 100 -Max 1000)
}

Wait-Logging        # See Note
```

### NOTE

When used in *unattended* scripts (scheduled tasks, spawned process) you need to call `Wait-Logging` to avoid loosing messages. If you run your main script in an interactive shell that stays open at the end of the execution you could avoid using it (keep in mind that if there are messeages in the queue when you close the shell, you'll lose them)

## Configuration

The following section describe how to configure the Logging module.

- Level
- Format
- Targets
- CustomTargets

### Level

The _Level_ property defines the default logging level.
Valid values are:

```powershell
* NOTSET    ( 0)
* DEBUG     (10)
* INFO      (20)
* WARNING   (30)
* ERROR     (40)
```

For example:

```powershell
> Get-LoggingDefaultLevel                       # Get the default value
NOTSET                                          # NOTSET level
> Set-LoggingDefaultLevel -Level 'ERROR'        # Set default level to ERROR
> Get-LoggingDefaultLevel                       # Get the current global level
ERROR
```

### Format

The _Format_ property defines how the message is rendered.

The default value is: `[%{timestamp}] [%{level:-7}] %{message}`

The Log object has a number of attributes that are replaced in the format string to produce the message:

| Format            | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `%{timestamp}`    | Time when the log message was created. Defaults to `%Y-%m-%d %T%Z` (_2016-04-20 14:22:45+02_). Take a look at this [Technet article](https://technet.microsoft.com/en-us/library/hh849887.aspx#sectionSection7) about the UFormat parameter, and this [Technet article](<https://msdn.microsoft.com/en-us/library/az4se3k1(v=vs.85).aspx>) for available `[DateTimeFormatInfo]`     |
| `%{timestamputc}` | UTC Time when the log message was created. Defaults to `%Y-%m-%d %T%Z` (_2016-04-20 12:22:45+02_). Take a look at this [Technet article](https://technet.microsoft.com/en-us/library/hh849887.aspx#sectionSection7) about the UFormat parameter, and this [Technet article](<https://msdn.microsoft.com/en-us/library/az4se3k1(v=vs.85).aspx>) for available `[DateTimeFormatInfo]` |
| `%{level}`        | Text logging level for the message (_DEBUG_, _INFO_, _WARNING_, _ERROR_)                                                                                                                                                                                                                                                                                                            |
| `%{levelno}`      | Number logging level for the message (_10_, _20_, _30_, _40_)                                                                                                                                                                                                                                                                                                                       |
| `%{lineno}`       | The line number on wich the write occured                                                                                                                                                                                                                                                                                                                                           |
| `%{pathname}`     | The path of the caller                                                                                                                                                                                                                                                                                                                                                              |
| `%{filename}`     | The file name part of the caller                                                                                                                                                                                                                                                                                                                                                    |
| `%{caller}`       | The caller function name                                                                                                                                                                                                                                                                                                                                                            |
| `%{message}`      | The logged message                                                                                                                                                                                                                                                                                                                                                                  |
| `%{body}`         | The logged body (json format not pretty printed)                                                                                                                                                                                                                                                                                                                                    |
| `%{execinfo}`     | The ErrorRecord catched in a try/catch statement                                                                                                                                                                                                                                                                                                                                    |
| `%{pid}`          | The process id of the currently running powershellprocess ($PID)                                                                                                                                                                                                                                                                                                                    |

After the placeholder name you can pass a padding or a date format string separated by a colon (`:`):

#### Padding

If the padding value is negative, the field will be left aligned and padded with spaces on the right:

```powershell
> Set-LoggingDefaultFormat -Format '[%{level:-7}]'
[DEBUG  ]
[INFO   ]
[WARNING]
[ERROR  ]
```

If the padding value is positive, the field will be right aligned and padded with spaces on the left:

```powershell
> Set-LoggingDefaultFormat -Format '[%{level:7}]'
[  DEBUG]
[   INFO]
[WARNING]
[  ERROR]
```

#### Date format string

The date format string starts with a plus sign (`+`) followed by **UFormat** OR **Format** (`[DateTimeFormatInfo]`) parameters. See [here](https://technet.microsoft.com/en-us/library/hh849887.aspx#sectionSection7) for available **UFormat**s, and [here](<https://msdn.microsoft.com/en-us/library/az4se3k1(v=vs.85).aspx>) for available **Format**s.

```powershell
> Set-LoggingDefaultFormat -Format '%{timestamp}'
2016-04-20 13:31:12+02

> Set-LoggingDefaultFormat -Format '%{timestamp:+%A, %B %d, %Y}'
Wednesday, April 20, 2016

> Set-LoggingDefaultFormat -Format '[%{timestamp:+%T:12}]'   # You could also use padding and date format string at the same time
[   13:31:12]

> Set-LoggingDefaultFormat -Format '[%{timestamp:+yyyy/MM/dd HH:mm:ss.fff}]'
[2016/04/20 13:31:12.431]
```

#### Caller

By default the caller cmdlet is assumed to be the parent function in the executing stack, i.e., the function directly calling the `Write-Log` cmdlet. However, there are instances where a wrapper cmdlet is used on top of `Write-Log` to trigger the logging, thus invalidating the default assumption for the caller.

In these scenarios, it is possible to set the caller scope using `Set-LoggingCallerScope`, which is shown in the example below along with the usage of a wrapper logging cmdlet.

```powershell
# Write-CustomLog is the wrapper logging cmdlet
# If the default caller scope is used, it would print 'Write-CustomLog' everytime
# filename has value only if the code below is executed in a script

Add-LoggingTarget -Name Console -Configuration @{Level = 'DEBUG'; Format = '[%{filename}] [%{caller}] %{message}'}
Set-LoggingCallerScope 2

function Write-CustomLog {
    [CmdletBinding()]
    param(
        $Level,
        $Message
    )

    Write-Log -Level $Level -Message $Message
}

function Invoke-CallerFunctionWithCustomLog {
    1..5 | ForEach-Object {
        # In this example, during execution of Write-Log the numeric scope represents the following:
        # 0 - Write-Log scope
        # 1 - Write-CustomLog scope (which would be default value)
        # 2 - Invoke-CallerFunctionWithCustomLog
        Write-CustomLog -Level (Get-Random 'DEBUG', 'INFO', 'WARNING', 'ERROR') -Message 'Hello, World! (With caller scope at level 2)'
    }
}

Invoke-CallerFunctionWithCustomLog
```

**Note**: A format string starting with a percent symbol (%) will use the `UFormat` parameter of `Get-Date`

### Targets

The _Targets_ property stores the used logging targets, it's where you define where to route your messages.

Keys of the hashtable depends on the target you are configuring. The module ships with 7 targets but you can write your own for specific usage.


#### Console

From version 2.3.3 it supports acquiring lock for issues with git prompt that sometimes gets splitted during output.
The mutex name to acquire is `ConsoleMtx`

```powershell
> Add-LoggingTarget -Name Console -Configuration @{
    Level           = <NOTSET>          # <Not required> Sets the logging level for this target
    Format          = <NOTSET>          # <Not required> Sets the logging format for this target
    PrintException  = $true             # <Not required> Prints stacktrace
    ColorMapping    = <NOTSET>          # <Not required> Overrides the level:color mappings with a [hashtable].
                                        #                Only need to specify the levels you wish to override
}
```

##### Colors

Default Console Colors

```powershell
$ColorMapping = @{
    'DEBUG'   = 'Blue'
    'INFO'    = 'Green'
    'WARNING' = 'Yellow'
    'ERROR'   = 'Red'
}
```

Each color will be verified against `[System.ConsoleColor]`. If it is invalid, an error will appear on the screen along with the orignal message.

```powershell
Add-LoggingTarget -Name Console -Configuration @{
    ColorMapping = @{
        DEBUG = 'Gray'
        INFO  = 'White'
    }
}
```

#### File

```powershell
> Add-LoggingTarget -Name File -Configuration @{
    Path            = <NOTSET>            # <Required> Sets the file destination (eg. 'C:\Temp\%{+%Y%m%d}.log')
                                          #            It supports templating like $Logging.Format
    PrintBody       = $false              # <Not required> Prints body message too
    PrintException  = $false              # <Not required> Prints stacktrace
    Append          = $true               # <Not required> Append to log file
    Encoding        = 'ascii'             # <Not required> Sets the log file encoding
    Level           = <NOTSET>            # <Not required> Sets the logging level for this target
    Format          = <NOTSET>            # <Not required> Sets the logging format for this target
    ############Rotating###################
    RotateAfterAmount = <NOTSET>          # <Not required> Sets the amount of files after which rotation is triggered
    RotateAmount      = <NOTSET>          # <Not required> Amount of files to be rotated, when RotateAfterAmount is used
    RotateAfterDate   = <NOTSET>          # <Not required> Rotate after the difference between the current datetime and the datetime of the file(s) are greater then the given timespan
    RotateAfterSize   = <NOTSET>          # <Not required> Rotate after the file(s) are greater than the given size in BYTES
    CompressionPath   = <NOTSET>          # <Not required> Path of archive (*.zip) to create for the rotated files
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{source = 'Logging'}
```

##### Rotation
This module provides the functionality for the file target to rotate log files.
To make full use of this functionality, variable data used inside the log path should be encoded, using the previously described format system.

When the file target is initialized, **all files** are retrieved, which **expand** the given log path.
All internally known **placeholders** are therefore substituted with **wildcard** characters.
Based upon this list of files a file is rotated, if
- the difference between it's creation and the current data is greater then the specified **RotateAfterDate**
- it's size in bytes exceeds **RotateAfterSize**
- more than **RotateAfterAmount** files are present and this file belongs to the oldest max(|Files| - RotateAfterAmount, RotateAmount) files.

The default behavior is to remove all rotated log files. It is however possible, to use the **CompressionPath** to define an archive for the rotated log files. **This requires >= NET4.5** The following placeholders are supported
- `%{timestamp}`
- `%{timestamputc}`
If an archive should already be present, the data is **merged**.

#### ElasticSearch

```powershell
> Add-LoggingTarget -Name ElasticSearch -Configuration @{
    ServerName     = <NOTSET>          # <Required> Sets the ES server name (eg. 'localhost')
    ServerPort     = <NOTSET>          # <Required> Sets the ES server port (eg. 9200)
    Index          = <NOTSET>          # <Required> Sets the ES index name to log to (eg. 'logs-%{+%Y.%m.%d}')
                                       #            It supports templating like $Logging.Format
    Type           = <NOTSET>          # <Required> Sets the ES type for the message (eg. 'log')
    Level          = <NOTSET>          # <Not required> Sets the logging format for this target
    Flatten        = $false            # <Not required> Transforms the log hashtable in a 1-D hashtable
    Https          = $false            # <Not required> Uses HTTPS instead of HTTP in elasticsearch URL if $true
    Authorization  = <NOTSET>          # <Not required> Converts creds to base64 and adds it to headers. (eg. 'username:password')
}

$Body = @{source = 'Logging'; host='bastion.constoso.com'; _metadata = @{ip = '10.10.10.10'; server_farm = 'WestEurope'}}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!' -Body $Body
```

##### NoFlatten

```json
{
  "_index": "powershell-2018-05-10",
  "_type": "doc",
  "_id": "6BfJXWMB8moSvzgSbZgo",
  "_score": 1,
  "_source": {
    "body": {
      "host": "bastion.constoso.com",
      "_metadata": {
        "server_farm": "WestEurope",
        "ip": "10.10.10.10"
      },
      "source": "Logging"
    },
    "levelno": 30,
    "timestamp": "2018-05-14T10:34:31+02",
    "level": "WARNING",
    "message": "Hello, Powershell, No Flatten"
  }
}
```

##### Flatten

```json
{
  "_index": "powershell-2018-05-10",
  "_type": "doc",
  "_id": "6RfJXWMB8moSvzgSeJj_",
  "_score": 1,
  "_source": {
    "source": "Logging",
    "server_farm": "WestEurope",
    "ip": "10.10.10.10",
    "levelno": 30,
    "level": "WARNING",
    "host": "bastion.constoso.com",
    "message": "Hello, Powershell, Flatten",
    "timestamp": "2018-05-14T10:34:34+02"
  }
}
```

#### Slack

```powershell
> Add-LoggingTarget -Name Slack -Configuration @{
    WebHook     = <NOTSET>          # <Required> Sets the Slack Webhook URI (eg. 'https://hooks.slack.com/services/xxxx/xxxx/xxxxxxxxxx')
    Channel     = <NOTSET>          # <Not required> Overrides the default channel of the Webhook (eg. '@username' or '#other-channel')
    BotName     = <NOTSET>          # <Not required> Overrides the default name of the bot (eg. 'PoshLogging')
    Level       = <NOTSET>          # <Not required> Sets the logging format for this target
    Format      = <NOTSET>          # <Not required> Sets the logging format for this target
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{source = 'Logging'}
```

#### Email

```powershell
> Add-LoggingTarget -Name Email -Configuration @{
    SMTPServer      = <NOTSET>                      # <Required> SMTP server FQDN
    From            = <NOTSET>                      # <Required> From address
    To              = <NOTSET>                      # <Required> A string of recipients delimited by comma (,) (eg. 'test@contoso.com, robin@hood.eu')
    Subject         = '[%{level:-7}] %{message}'    # <Not required> Email subject. Supports formatting and expansion
    Attachments     = <NOTSET>                      # <Not required> Path to the desired file to attach
    Credential      = <NOTSET>                      # <Not required> If your server uses authentication
    Level           = <NOTSET>                      # <Not required> Sets the logging format for this target
    Port            = <NOTSET>                      # <Not required> Set the SMTP server's port
    UseSsl          = $false                        # <Not required> Use encrypted transport to SMTP server
    PrintException  = $false                        # <Not required> Print stacktrace in the body
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{source = 'Logging'}
```

#### Seq

```powershell
> Add-LoggingTarget -Name Seq -Configuration @{
    Url         = <NOTSET>          # <Required> Url to Seq instance
    ApiKey      = <NOTSET>          # <Not required> Api Key to authenticate to Seq
    Properties  = <NOTSET>          # <Required> Hashtable of user defined properties to be added to each Seq message
    Level       = <NOTSET>          # <Not required> Sets the logging level for this target
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{source = 'Logging'}
```

#### WinEventLog

Before you can log events you need to make sure that the LogName and Source exists. This needs to be done only once (run as an Administrator)

```powershell
> New-EventLog -LogName <NOTSET> -Source <NOTSET>
```

You can now log to the EventLog from your script

```powershell
> Add-LoggingTarget -Name WinEventLog -Configuration @{
    LogName = <NOTSET>          # <Required> Name of the log to which the events are written (eg. 'Application', 'System' and etc.)
    Source  = <NOTSET>          # <Required> Event source, which is typically the name of the application that is writing the event to the log

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{ EventID = 123 }
}
```

#### Teams

```powershell
> Add-LoggingTarget -Name Teams -Configuration @{
    WebHook     = <NOTSET>          # <Required> Sets the Teams Connector URI (eg. 'https://outlook.office.com/webhook/...')
    Details     = $true             # <Not required> Prints Log message details like PID, caller etc.
    Level       = <NOTSET>          # <Not required> Sets the logging format for this target
    Colors      = @{                # <Not required> Maps log levels to badge colors
        'DEBUG'   = 'blue'
        'INFO'    = 'brightgreen'
        'WARNING' = 'orange'
        'ERROR'   = 'red'
    }
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{source = 'Logging'}
```

### CustomTargets

It lets define a folder to load custom targets.

```powershell
> Set-LoggingCustomTarget -Path 'C:\temp\'
> Get-LoggingAvailableTarget
Name                           Value
----                           -----
Console                        {Configuration, ParamsRequired, Logger}
ElasticSearch                  {Configuration, ParamsRequired, Logger}
File                           {Configuration, ParamsRequired, Logger}
Slack                          {Configuration, ParamsRequired, Logger}
MyCustomTarget                 {Configuration, ParamsRequired, Logger}
```

#### AzureLogAnalytics

Log directly to a Azure Log Analytics Workspace from your script

```powershell
> Import-Module Logging
Add-LoggingTarget -Name AzureLogAnalytics -Configuration @{
    WorkspaceId = <NOTSET>          # <Required> Id of the Azure Log Analytics Workspace
    SharedKey   = <NOTSET>          # <Required> Primary or Secondary Key to access the Azure Log Analytics Workspace
    LogType     = "Logging"         # <Not required> Creates a custom LogType in Log Analytics Workspace
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell'
Write-Log -Level 'WARNING' -Message 'Hello, Powershell!' -Body { Computer = $env:COMPUTERNAME }
```

## Contributing

Please use [issues](https://github.com/hanpq/PSLogs/issues) system or GitHub pull requests to contribute to the project.

For more information, see [CONTRIBUTING](https://github.com/hanpq/PSLogs/blob/main/.github/CONTRIBUTING.md)

## Notes

- The dispatcher thread starts the first time a `Write-Log` command is executed and keeps running in the background to dispatch new messages until the module is removed.
- The runspace code is inspired by the work and research of Boe Prox (@proxb).


## License

This project is licensed under the [MIT License][license]

---

## Included attributions from orginal repo

Special thanks to:

- Boe Prox (@proxb) for his work on [runspaces][runspaces]

[github]: https://github.com/EsOsO
[module]: https://github.com/EsOsO/Logging
[runspaces]: https://learn-powershell.net/tag/runspace/
[license]: https://github.com/EsOsO/Logging/blob/main/docs/LICENSE.md
