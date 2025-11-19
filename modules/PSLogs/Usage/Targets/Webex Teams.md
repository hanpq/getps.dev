### WebexTeams

Post message to Webex

#### Configuration options

| Option   | Type      | Mandatory | Default            | Description                                |
| -------- | --------- | :-------: | ------------------ | ------------------------------------------ |
| Level    | String    |    No     | Default Level      | Defines the lowest logging level to logged |
| Format   | String    |    No     | Default Format     | Defines a custom format for the target     |
| BotToken | String    |    Yes    | N/A                | Defines the bot token                      |
| RoomID   | String    |    Yes    | N/A                | Defines the room id                        |
| Icons    | HashTable |    No     | See defaults below | Override the default icons                 |

#### Default icons

- ERROR   = '🚨'
- WARNING = '⚠️'
- INFO    = 'ℹ️'
- DEBUG   = '🔎'

#### Example

```powershell
Add-LoggingTarget -Name WebexTeams -Configuration @{
    Level = 'DEBUG'
    Format = '%{message}'
    BotToken = ''
    RoomID = ''
    Icons = @{
        ERROR = '🚨'
        WARNING = '⚠️'
        INFO    = 'ℹ️'
        DEBUG   = '🔎'
    }
}

Write-Log -Level 'WARNING' -Message 'Hello, Powershell!'
```
