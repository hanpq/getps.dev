### Gelf

Graylog logging format, used to send rich log messages to a Graylog server or other log management system using the Gelf protocol.

#### Configuration options

| Option          | Type      | Mandatory | Default        | Description                                                  |
| --------------- | --------- | :-------: | -------------- | ------------------------------------------------------------ |
| Level           | String    |    No     | Default Level  | Defines the lowest logging level to logged                   |
| Server          | String    |    Yes    | N/A            | Defines the servername of the Graylog server                 |
| Port            | Int       |    Yes    | N/A            | Defines the port number of the Gelf Input                    |
| HostName        | String    |    No     | $env:hostname  | Defines the hostname of the server running the script        |
| Format          | String    |    No     | Default Format | Defines a custom format for the target                       |
| Protocol        | String    |    No     | 'TCP'          | Defines if the Gelf input is UDP or TCP                      |
| AdditionalField | Hashtable |    No     | $null          | Optionally pass on additional static values for the log item |

#### Example

```powershell
Add-LoggingTarget -Name Gelf -Configuration @{
    Level = 'DEBUG'
    Server = 'graylog.contoso.com'
    Port = 12202
    Hostname = 'scriptserver.contoso.com'
    Format = '%{message}'
    Protocol = 'UDP'
    AdditionalFields = @{
        Month = (Get-Date).ToString('MMM')
    }
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
```
