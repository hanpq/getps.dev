### Seq

#### Configuration options

| Option     | Type      | Mandatory | Default       | Description                                                          |
| ---------- | --------- | :-------: | ------------- | -------------------------------------------------------------------- |
| Level      | String    |    No     | Default Level | Defines the lowest logging level to logged                           |
| Url        | String    |    Yes    | N/A           | Url to Seq instance                                                  |
| ApiKey     | String    |    No     | N/A           | Api Key to authenticate to Seq                                       |
| Properties | HashTable |    No     | N/A           | Hashtable of user defined properties to be added to each Seq message |

#### Example

```powershell
> Add-LoggingTarget -Name Seq -Configuration @{
    Url         = <NOTSET>
    ApiKey      = <NOTSET>
    Properties  = <NOTSET>
    Level       = <NOTSET>
}
```
