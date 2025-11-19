---
slug: cleanup-github-artifacts
title: Cleanup GitHub Artifacts
authors: hanpq
tags: [Powershell, Github]
keywords: [powershell,github,rest,api,artifact,artifacts]
description: Script to remove/cleanup github artifacts
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/cleanup-github-artifacts"
data-layout="button"
data-size="small">
</div>

:::info

This script has been integrated in the module [PSDev](https://getps.dev/modules/psdev) and is no longer provided as a stand-alone script.

:::

At the time of writing this post there is no native automated way to cleanup/remove github artifacts produced within GitHub Action Workflows. If you for instance have an automated build process you will quite fast hit the free storage quota in GitHub and you'll have to start paying for additional storage. There are a few available options to manage this. You could manually remove each workflow run that could contain artifacts. This could be time consuming work. You could also configure the retention time of workflows in each repo. However both of these will remove the logs of each workflow run as well. A better way if you don't need the artifacts after the workflow run is to add a cleanup job to the workflow. I've been using [geekyeggo/delete-artifact@v2](https://github.com/GeekyEggo/delete-artifact). This action till remove the artifacts that i specify in the workflow file automatically within a cleanup job at the end of the workflow. This works great for future workflow runs once you configure the cleanup job. But what about if you have hit the storage quota and need to cleanup all existing artifacts? Then you would have to do it manually or call the GitHub Rest API and remove all artifacts. This is what the below script does, it will enumerate all artifacts for a specific repo or all repos for a user account and remove all artifacts.

```powershell
Remove-GitHubArtifact -GitHubSecret "ABC" -GitHubOrg "user"

Repo                                Artifacts_Found Artifacts_Removed Artifacts_SizeMB
----                                --------------- ----------------- ----------------
PSDaikin                                          5                 5               43
PSDataSet                                         2                 2                2
PSMaintenanceManager                              2                 2               21
PSPortainer                                      34                34              321
PSQueue                                           0                 0                0
PSScriptInfo                                      0                 0                0
PSSort                                            0                 0                0
```

Or for a specific repo:
```powershell
Remove-GitHubArtifact -GitHubSecret "ABC" -GitHubOrg "user" -Repo "PSMaintenanceManager"

Repo                                Artifacts_Found Artifacts_Removed Artifacts_SizeMB
----                                --------------- ----------------- ----------------
PSMaintenanceManager                              2                 2               21
```

:::danger

The script will remove all artifacts for the specified repo or all repos on the account. This is destructive and can not be reversed.

:::

<Comments />
