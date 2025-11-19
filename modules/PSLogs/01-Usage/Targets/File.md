### File

#### Configuration options

| Option            | Type     | Mandatory | Default        | Description                                                                                                                     |
| ----------------- | -------- | :-------: | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Path              | String   |    Yes    | N/A            | Sets the file destination. It supports templating like $Logging.Format                                                          |
| PrintBody         | Boolean  |    No     | $false         | Prints body message too                                                                                                         |
| Append            | Boolean  |    No     | $true          | Append to log file                                                                                                              |
| Encoding          | String   |    No     | ascii          | Sets the log file encoding                                                                                                      |
| Level             | String   |    No     | Default Level  | Defines the lowest logging level to logged                                                                                      |
| Format            | String   |    No     | Default Format | Defines a custom format for the target                                                                                          |
| PrintException    | Boolean  |    No     | $true          | Prints the stacktrace when an exception object is passed to Write-Log                                                           |
| ShortLevel        | Boolean  |    No     | $false         | If true the written level name is trimmed to three chars, ie ERROR -> ERR. This makes the logs more aligned and easier to read. |
| RotateAfterAmount | Int      |    No     | N/A            | Sets the amount of files after which rotation is triggered                                                                      |
| RotateAmount      | Int      |    No     | N/A            | Amount of files to be rotated, when RotateAfterAmount is used                                                                   |
| RotateAfterDate   | DateTime |    No     | N/A            | Rotate after the difference between the current datetime and the datetime of the file(s) are greater then the given timespan    |
| RotateAfterSize   | Int      |    No     | N/A            | Rotate after the file(s) are greater than the given size in BYTES                                                               |
| CompressionPath   | String   |    No     | N/A            | Path of archive (*.zip) to create for the rotated files                                                                         |

#### Example

```powershell
> Add-LoggingTarget -Name File -Configuration @{
    Path            = 'C:\Temp\%{+%Y%m%d}.log'        
    PrintBody       = $false              
    PrintException  = $false              
    Append          = $true               
    Encoding        = 'ascii'             
    Level           = 'VERBOSE'          
    Format          =  '[%{timestamp}] [%{level}] %{message}'         
    RotateAfterAmount = <NOTSET>          
    RotateAmount      = <NOTSET>          
    RotateAfterDate   = <NOTSET>          
    RotateAfterSize   = <NOTSET>          
    CompressionPath   = <NOTSET>          
}
```

##### Rotation/Removal
_The word `Rotate` has caused some confusion, `Rotate` is more often used to describe when a new log file is generated. In `PSLogs` and formerly the `Logging` module, `Rotate` is more of a `Cleanup` where old log files are removed. Rotation of log file, in other words, generation of new log files is determined by the log file path and variables used for the folder and/or file name. I would love to change this to `Cleanup`/`Remove` instead, but it would be a breaking change._

This module provides the functionality for the file target to remove old log files. To make full use of this functionality, variable data used inside the log path should be encoded, using the previously described format system.

When the file target is initialized, **all files** are retrieved, which **expand** the given log path.
All internally known **placeholders** are therefore substituted with **wildcard** characters.
Based upon this list of files a file is removed, if 
- the difference between it's creation and the current data is greater then the specified **RotateAfterDate**
- it's size in bytes exceeds **RotateAfterSize**
- more than **RotateAfterAmount** files are present and this file belongs to the oldest max(|Files| - RotateAfterAmount, RotateAmount) files.

The default behavior is to remove the log files. It is however possible, to use the **CompressionPath** to define an archive for the rotated log files. **This requires >= NET4.5** The following placeholders are supported
- `%{timestamp}`
- `%{timestamputc}`
If an archive should already be present, the data is added to that archive.
