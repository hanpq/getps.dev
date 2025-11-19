### Format

The _Format_ property defines how the message is rendered.

The default value is: `[%{timestamp}] [%{level:-7}] %{message}`

#### Built-in variables

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
