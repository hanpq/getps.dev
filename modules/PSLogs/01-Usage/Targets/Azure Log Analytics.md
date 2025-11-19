#### AzureLogAnalytics


Log directly to a Azure Log Analytics Workspace from your script

#### Configuration options

| Option      | Type   | Mandatory | Default                       | Description                                                          |
| ----------- | ------ | :-------: | ----------------------------- | -------------------------------------------------------------------- |
| Level       | String |    No     | Default Level                 | Defines the lowest logging level to logged                           |
| WorkspaceId | String |    Yes    | N/A                           | Id of the Azure Log Analytics Workspace                              |
| SharedKey   | String |    Yes    | $true                         | Primary or Secondary Key to access the Azure Log Analytics Workspace |
| LogType     | String |    No     | Defaults shown in the example | Creates a custom LogType in Log Analytics Workspace                  |

#### Example

```powershell
Add-LoggingTarget -Name AzureLogAnalytics -Configuration @{
    WorkspaceId = '8eda8332-16eb-400b-9f0b-6a21e1c1cf28'       
    SharedKey   = 'w7ZhaGTDtmgxcDJlaMO2YWxza2Rqw7Z1MnlvNDd5MWRsYWpraHNsa2Rhc2Q='    
    LogType     = "Logging"  
    Level       = 'DEBUG'      
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!' -Body { Computer = $env:COMPUTERNAME }
```
