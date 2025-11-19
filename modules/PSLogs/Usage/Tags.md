#### Tags-based Message Routing

PSLogs now supports tag-based message routing, allowing you to send specific log messages to specific targets based on matching tags.

**Target Configuration:**
Targets can be configured with a `Tags` array in their configuration:

```powershell
Add-LoggingTarget -Type File -UniqueName 'DatabaseLogs' -Configuration @{
    Level = 'DEBUG'
    Path = 'C:\\Logs\\database.log'
    Tags = @('Database', 'Performance')  # This target accepts messages tagged with 'Database' or 'Performance'
}

Add-LoggingTarget -Type File -UniqueName 'WebLogs' -Configuration @{
    Level = 'INFO'
    Path = 'C:\Logs\web.log'
    Tags = @('Web', 'API', 'HTTP')  # This target accepts messages tagged with 'Web', 'API', or 'HTTP'
}
```

**Message Tagging:**
Log messages can be tagged using the `-Tags` parameter in `Write-Log`:

```powershell
# This message will only go to targets that have 'Database' in their tags
Write-Log -Level INFO -Message 'Database connection established' -Tags 'Database'

# This message will go to targets that have 'Web' OR 'Performance' in their tags
Write-Log -Level DEBUG -Message 'API response time: 150ms' -Tags 'Web', 'Performance'

# Multiple tags - message goes to targets matching ANY of these tags
Write-Log -Level ERROR -Message 'Critical system failure' -Tags 'Database', 'Web', 'Critical'
```

**Tag Matching Rules:**
- Tag matching is **case-insensitive** ('database' matches 'Database')
- If a message has multiple tags, it will be sent to targets that match **any** of those tags (OR logic)
- If a target has multiple tags, a message needs to match **any** of the target's tags to be routed there
- Messages without tags default to the 'Default' tag
- Targets without tags default to accepting the 'Default' tag
- **Backward Compatibility:** Existing configurations without tags will continue to work as before

**Example Scenario:**
```powershell
# Set up specialized logging targets
Add-LoggingTarget -Type File -UniqueName 'GeneralLogs' -Configuration @{
    Level = 'INFO'
    Path = 'C:\\Logs\\general.log'
    Tags = @('Default', 'General')  # Accepts default messages and general messages
}

Add-LoggingTarget -Type File -UniqueName 'DatabaseLogs' -Configuration @{
    Level = 'DEBUG'
    Path = 'C:\\Logs\\database.log'
    Tags = @('Database', 'SQL', 'Performance')
}

Add-LoggingTarget -Type File -UniqueName 'ErrorLogs' -Configuration @{
    Level = 'ERROR'
    Path = 'C:\Logs\errors.log'
    Tags = @('Error', 'Database', 'Web')  # Catches errors from multiple sources
}

# Usage
Write-Log 'Application started'  # Goes to GeneralLogs (default tag)
Write-Log -Message 'Query executed in 50ms' -Tags @('Database')  # Goes to DatabaseLogs
Write-Log -Level ERROR -Message 'Connection failed' -Tags @('Database')  # Goes to both DatabaseLogs and ErrorLogs
```
