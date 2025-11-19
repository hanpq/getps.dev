The following section describe how to configure the Logging module.

- Level
- Format
- Targets
- CustomTargets

:::MStip[TIP]
Refer to the specific target documentation for information on configurable parameters for that target.
:::

## Level

There are two aspects of the log level. First the level of each log message and secondly what levels should be logged to the targets. Each target can be configured to a logging level meaning that you might want to log DEBUG and higher to file but only VERBOSE and higher to console. You can also define a default logging level for all targets with `Set-DefaultLoggingLevel`. This default logging level will be used if logging level is omitted in the target configuration.

### Built-in logging levels

```powershell
* NOTSET    ( 0)
* SQL       ( 5)
* DEBUG     (10)
* VERBOSE   (14)
* INFO      (20)
* NOTICE    (24)
* SUCCESS   (26)
* WARNING   (30)
* ERROR     (40)
* CRITICAL  (50)
* ALERT     (60)
* EMERGENCY (70)
```

### Configure default logging level

For example:

```powershell
> Get-LoggingDefaultLevel                       # Get the default value
NOTSET                                          # NOTSET level
> Set-LoggingDefaultLevel -Level 'ERROR'        # Set default level to ERROR
> Get-LoggingDefaultLevel                       # Get the current global level
ERROR
```

### Configure target logging level

```powershell
Add-LoggingTarget -Name Console -Configuration @{
    Level = 'DEBUG'
}
```
