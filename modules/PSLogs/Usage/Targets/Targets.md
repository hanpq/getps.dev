## Targets

The _Targets_ property stores the used logging targets, it's where you define where to route your messages.

Keys of the hashtable depends on the target you are configuring. The module ships with 12 targets but you can write your own for specific usage.

When adding a target with `Add-LoggingTarget`, the `-Configuration` parameter accepts a hashtable where additional configuration items can be specified. Each target have its own set of items that can be configured. See the Target specific documentation for further information about the available options.

#### Multiple Targets of Same Type

Starting from version 5.6.1, PSLogs supports multiple instances of the same target type using the `UniqueName` parameter. This allows you to configure multiple File targets, Console targets, etc., each with different configurations.

```powershell
# Multiple File targets with different configurations
Add-LoggingTarget -Type File -UniqueName 'ErrorLogs' -Configuration @{
    Level = 'ERROR'
    Path = 'C:\\Logs\\errors.log'
    Tags = @('Error', 'Critical')
}

Add-LoggingTarget -Type File -UniqueName 'DebugLogs' -Configuration @{
    Level = 'DEBUG'
    Path = 'C:\\Logs\\debug.log'
    Tags = @('Debug', 'Development')
}

# Multiple Console targets with different formatting
Add-LoggingTarget -Type Console -UniqueName 'SimpleConsole' -Configuration @{
    Level = 'INFO'
    Format = '%{message}'
    Tags = @('User')
}

Add-LoggingTarget -Type Console -UniqueName 'DetailedConsole' -Configuration @{
    Level = 'DEBUG'
    Format = '[%{timestamp}] [%{level}] [%{caller}] %{message}'
    Tags = @('Developer')
}
```

**Parameters:**
- `-Type`: The target type (File, Console, etc.)
- `-UniqueName`: Unique identifier for this target instance. If omitted, defaults to the Type value
- `-Configuration`: Target-specific configuration including the new `Tags` property

**Note:** For backward compatibility, the `-Name` parameter is still supported as an alias for `-Type`.
