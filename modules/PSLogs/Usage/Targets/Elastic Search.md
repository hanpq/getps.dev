### ElasticSearch

#### Configuration options

| Option        | Type    | Mandatory | Default       | Description                                                                   |
| ------------- | ------- | :-------: | ------------- | ----------------------------------------------------------------------------- |
| Level         | String  |    No     | Default Level | Defines the lowest logging level to logged                                    |
| ServerName    | String  |    Yes    | N/A           | Sets the ES server name                                                       |
| ServerPort    | Int     |    Yes    | N/A           | Sets the ES server port                                                       |
| Index         | String  |    Yes    | N/A           | Sets the ES index name to log to. It supports templating like $Logging.Format |
| Type          | String  |    Yes    | N/A           | Sets the ES type for the message                                              |
| Flatten       | Boolean |    No     | $false        | Transforms the log hashtable in a 1-D hashtable                               |
| Https         | Boolean |    No     | $false        | Uses HTTPS instead of HTTP in elasticsearch URL if $true                      |
| Authorization | String  |    No     |               | Converts creds to base64 and adds it to headers.                              |

#### Example

```powershell
> Add-LoggingTarget -Name ElasticSearch -Configuration @{
    ServerName     = 'localhost'
    ServerPort     = 9200
    Index          = 'logs-%{+%Y.%m.%d}'             
    Type           = 'log'
    Level          = 'WARNING'
    Flatten        = $false            
    Https          = $false            
    Authorization  = 'username:password'
}

$Body = @{source = 'Logging'; host='bastion.constoso.com'; _metadata = @{ip = '10.10.10.10'; server_farm = 'WestEurope'}}
Write-Log -Level 'WARNING' -Message 'Hello, Powershell!' -Body $Body
```

##### Example Flatten=$false

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

##### Example Flatten=$true

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
