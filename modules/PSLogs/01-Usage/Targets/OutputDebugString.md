### OutputDebugString

Writes formatted log messages to the Windows debugger using the Unicode `OutputDebugStringW` API. Messages can be viewed using an attached debugger or a debug-output listener such as [Sysinternals DebugView](https://learn.microsoft.com/en-us/sysinternals/downloads/debugview).

#### Platform support

This target supports Windows, including Windows PowerShell 5.1 and PowerShell 7. On Linux and macOS, the target silently returns without writing messages, loading Windows interop code, or emitting warnings.

A debugger or listener is not required to enable the target. However, messages are not retained if nothing is listening. Start your listener before writing log messages.

#### Configuration options

| Option         | Type    | Mandatory | Default        | Description |
| -------------- | ------- | :-------: | -------------- | ----------- |
| Level          | String  | No        | Default Level  | Defines the lowest logging level to write. |
| Format         | String  | No        | Default Format | Defines the message format using PSLogs format tokens. |
| PrintException | Boolean | No        | `$true`        | Appends the exception message and script stack trace when exception information is passed to `Write-Log`. |

All configuration options are optional.

#### Example

```powershell
Add-LoggingTarget -Type OutputDebugString -Configuration @{
    Level = 'DEBUG'
    Format = '[%{timestamp}] [%{level}] %{message}'
    PrintException = $true
}

Write-Log -Level INFO -Message 'Hello, debugger!'
Wait-Logging
```

For the simplest configuration, use `Add-LoggingTarget -Type OutputDebugString` to use the module's default level and format.

#### Exception details

```powershell
try
{
    Get-Item -Path 'C:\Missing\example.txt' -ErrorAction Stop
}
catch
{
    Write-Log -Level ERROR -Message 'Unable to read the file' -ExceptionInfo $_
}

Wait-Logging
```

Set `PrintException = $false` to omit the appended exception details.

See [Format](../Format.md) for available format tokens and [Targets](./Targets.md) for configuring multiple instances or routing messages using tags.
