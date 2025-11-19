### CustomTargets

If you write a target plugin by your self you can define a path where the module will look for additional target plugins.

Please consider making a pull request to the PSLogs repo so that the target plugin can be included by default in the module.

```powershell
> Set-LoggingCustomTarget -Path 'C:\temp\'
> Get-LoggingAvailableTarget
Name                           Value
----                           -----
Console                        {Configuration, ParamsRequired, Logger}
ElasticSearch                  {Configuration, ParamsRequired, Logger}
File                           {Configuration, ParamsRequired, Logger}
Slack                          {Configuration, ParamsRequired, Logger}
MyCustomTarget                 {Configuration, ParamsRequired, Logger}
```
