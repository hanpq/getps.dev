### Teams

#### Configuration options

| Option  | Type      | Mandatory | Default                       | Description                                      |
| ------- | --------- | :-------: | ----------------------------- | ------------------------------------------------ |
| Level   | String    |    No     | Default Level                 | Defines the lowest logging level to logged       |
| WebHook | String    |    Yes    | N/A                           | Sets the Teams Connector URI                     |
| Details | Boolean   |    No     | $true                         | Prints Log message details like PID, caller etc. |
| Colors  | HashTable |    No     | Defaults shown in the example | Maps log levels to badge colors                  |

#### Example

```powershell
> Add-LoggingTarget -Name Teams -Configuration @{
    WebHook     = 'https://outlook.office.com/webhook/...'
    Details     = $true             
    Level       = 'ALERT'          
    Colors      = @{              
        'DEBUG'     = 'blue'
        'INFO'      = 'brightgreen'
        'WARNING'   = 'orange'
        'ERROR'     = 'red'
        'NOTICE'    = 'gray'
        'VERBOSE'   = 'yellow'
        'SUCCESS'   = 'green'
        'CRITICAL'  = 'red'
        'ALERT'     = 'red'
        'EMERGENCY' = 'magenta'
    }
}

Write-Log -Level 'WARNING' -Message 'Hello, {0}!' -Arguments 'Powershell' -Body @{source = 'Logging'}
```
