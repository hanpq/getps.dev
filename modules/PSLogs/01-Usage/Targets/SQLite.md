### SQLite

#### Configuration options

| Option         | Type      | Mandatory | Default                                                                          | Description                                                      |
| -------------- | --------- | :-------: | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Level          | String    |    No     | Default Level                                                                    | Defines the lowest logging level to logged                       |
| Database       | String    |    Yes    | N/A                                                                              | Set the database file path                                       |
| TableName      | String    |    Yes    | N/A                                                                              | Set the table name the logs should be inserted to.               |
| ColumnMapping  | Hashtable |    No     | Timestamp = 'Timestamp'; Level = 'Level'; Source = 'Caller'; Message = 'Message' | Overrides what built-in values should be inserted into the table |
| MessageFormat  | String    |    No     |                                                                                  | Override the message format                                      |
| PrintException | Boolean   |    No     | $false                                                                           | Append the exception and stackstrace to the message              |

#### Example

```powershell
Add-LoggingTarget -Name SQLite -Configuration @{
    Database      = "$PSScriptRoot\Logs.sqlite"
    TableName     = 'Logs'
    ColumnMapping = @{
        Timestamp = 'Timestamp'
        Severity  = 'Level'
        Source    = 'Caller'
        Message   = 'Message'
    }
    Level         = 'debug'
}

```

#### ColumnMapping for built in variables

Using column mapping the following values can be used out-of-the-box 

- pathname
- pid
- body
- timestamp
- rawmessage
- lineno
- filename
- caller
- level
- timestamputc
- execinfo
- message
- levelno

The key of the ColumnMapping hashtable is the SQL Table column name and the value is one of the above properties.

#### Custom columns

You can also provide custom values for the logging table by providing a hashtable to the Body parameter. Make sure that the table actually has the columns before trying to log them.

```powershell
Write-Log -Level 'WARNING' -Message 'Hello' -Body @{PSEdition = $PSEdition}
```

#### Setup the database

When you have the dependency module PSSQLite installed you can use the following command to initialize a SQLite database for logging. Modify appropriately.

```powershell
$Query = @'
CREATE TABLE "Logs" (
	"Timestamp"	DATETIME NOT NULL,
	"Severity"	TEXT NOT NULL,
	"Source"	TEXT NOT NULL,
	"Message"	TEXT NOT NULL,
	"PSEdition"	TEXT
);
'@
Invoke-SqliteQuery -DataSource C:\Path\To\logs.sqlite -Query $Query
```
