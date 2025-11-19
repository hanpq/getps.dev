## Write-Log

The Write-Log function is main tool to actually write/send each log message. One the targets are configured, Write-Log will queue the log message to be written to all configured targets as long as the minimum Level is reached.

Write-Log accepts the following parameters 
- `-Level` parameter to define that logs level. 
- `-Message` parameter defines the actual message to log. 
- `-Arguments` parameter allows you to use format placeholders in the message like, -Message 'Hello, {0}' -Arguments $Username
- `-Body` parameter allows you pass additional info the target. Please see the target specific documentation for more information.
- `-ExceptionInfo` parameter allows you to pass an Exception object to the target. Targets might process these objects differently.
