### Email

#### Configuration options

| Option         | Type         | Mandatory | Default        | Description                                      |
| -------------- | ------------ | :-------: | -------------- | ------------------------------------------------ |
| Level          | String       |    No     | Default Level  | Defines the lowest logging level to logged       |
| Format         | String       |    No     | Default Format | Defines a custom format for the target           |
| SMTPServer     | String       |    Yes    | N/A            | SMTP server FQDN                                 |
| From           | String       |    Yes    | N/A            | From address                                     |
| To             | String       |    Yes    | N/A            | A string of recipients                           |
| Subject        | String       |    No     | N/A            | Email subject. Supports formatting and expansion |
| Attachments    | String       |    No     | N/A            | Path to the desired file to attach               |
| Credential     | PSCredential |    No     | N/A            | If your server uses authentication               |
| Port           | Int          |    No     | 25             | Set the SMTP server's port                       |
| UseSsl         | Boolean      |    No     | N/A            | Use encrypted transport to SMTP server           |
| PrintException | Boolean      |    No     | N/A            | Print stacktrace in the body                     |

#### Example

```powershell
> Add-LoggingTarget -Name Email -Configuration @{
    SMTPServer      = 'smtp.contoso.com'                     
    From            = 'PSLogs <pslogs@contoso.com>'
    To              = 'test@contoso.com,robin@hood.eu'
    Subject         = '[%{level:-7}] %{message}'    
    Attachments     = 'C:\Path\To\StateSnapshot.xml'
    Credential      = $cred
    Level           = 'ALERT'                      
    Port            = 587                      
    UseSsl          = $true                    
    PrintException  = $true        
}
```
