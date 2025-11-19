### WinEventLog

#### Prerequisites

Before you can log events you need to make sure that the LogName and Source exists. This needs to be done only once (run as an Administrator)

```powershell
> New-EventLog -LogName <NOTSET> -Source <NOTSET>
```

You can now log to the EventLog from your script

#### Configuration options

| Option  | Type   | Mandatory | Default       | Description                                                                                       |
| ------- | ------ | :-------: | ------------- | ------------------------------------------------------------------------------------------------- |
| LogName | String |    Yes    | N/A           | Name of the log to which the events are written                                                   |
| Source  | String |    Yes    | N/A           | Event source, which is typically the name of the application that is writing the event to the log |
| Level   | String |    No     | Default Level | Defines the lowest logging level to logged                                                        |

#### EventID

EventID can be specified as body.

#### Translated Level

Levels will be translated to valid WinEvent log levels

- Greated than 40 = Error
- Between 30 and 39 = Warning
- Less than 30 = Information

#### Example

```powershell
> Add-LoggingTarget -Name WinEventLog -Configuration @{
    LogName = 'Application'
    Source  = 'MyNiceScript'
    Level = 'WARNING'
}

Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{ EventID = 123 }

```
