### Slack

#### Configuration options

| Option  | Type   | Mandatory | Default        | Description                                  |
| ------- | ------ | :-------: | -------------- | -------------------------------------------- |
| Level   | String |    No     | Default Level  | Defines the lowest logging level to logged   |
| Format  | String |    No     | Default Format | Defines a custom format for the target       |
| WebHook | String |    Yes    | N/A            | Sets the Slack Webhook URI                   |
| Channel | String |    No     | N/A            | Overrides the default channel of the Webhook |
| BotName | String |    No     | N/A            | Overrides the default name of the bot        |

#### Example

```powershell
> Add-LoggingTarget -Name Slack -Configuration @{
    WebHook     = 'https://hooks.slack.com/services/xxxx/xxxx/xxxxxxxxxx'      
    Channel     = '#other-channel'
    BotName     = 'PoshLogging' 
    Level       = 'ALERT'   
    Format      = '[%{timestamp}] [%{level}] %{message}'        
}
```
