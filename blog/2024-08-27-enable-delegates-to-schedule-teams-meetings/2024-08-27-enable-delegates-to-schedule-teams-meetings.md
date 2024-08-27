---
slug: enable-delegates-to-schedule-teams-meetings
title: Enable exchange delegates to schedule teams meetings
authors: hanpq
tags: [powershell,exchange,outlook,delegate,delegates,teams,meeting,office365]
keywords: [powershell,exchange,outlook,delegate,delegates,teams,meeting,office365]
description: This article describes the steps to take to enable delegates to schedule teams meetings.
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/enable-delegates-to-schedule-teams-meetings"
data-layout="button"
data-size="small">
</div>

# Streamlining Meeting Scheduling in Hybrid Environments: Resolving Delegate Scheduling Errors in Exchange and Teams Integration

In today's interconnected workplace, seamless collaboration is essential. One common challenge that arises is when a delegate tries to schedule a meeting on behalf of another user (the delegator) and encounters an error when attaching a Teams meeting in Outlook. The error message, "Unable to connect to the server, please try again later," can be both confusing and disruptive.

This issue affects users whose mailboxes are hosted on-premises within an Exchange hybrid environment. While the Exchange hybrid configuration is working and the Teams calendar for on-premises mailboxes is functional, this specific error persists.

## Understanding the Root Cause

The underlying reason for this issue is the absence of a necessary PartnerApplication in the on-premises Exchange server for Skype for Business Online. This application is crucial for enabling the Teams service to generate meeting links for users who are scheduling meetings on behalf of others. Without it, the delegate is unable to successfully create a Teams meeting. This PartnerApplication is not configured as part of the Exchange Hybrid setup wizard nor in the procedure to configure a Skype for Business hybrid.

The steps to configure this PartnerApplication are well-documented in official Microsoft resources. However, there have been some errors in the conversion of PowerShell script code from the deprecated MSOnline (MSOL) module to Microsoft Graph (MSGraph). This conversion appears to have been done without proper testing, and is as of now not working.

In this blog post, we will walk you through the correct steps to configure the PartnerApplication using the MSOL module, as it has proven to be more reliable in this scenario.

:::warning[Important]

Before proceeding, it's important to ensure that the delegate has been assigned the "Editor" role. Assigning the "Owner" role may seem like a viable option, but it does not work in this context.

:::

## Step 1: Create a New Mail User Account for the Skype for Business Online Partner Application

This initial step involves creating a mail user on the Exchange server and assigning the appropriate management role rights. This account will be used later in the process.

Here’s how you can do it:

```powershell
$user = New-MailUser -Name SfBOnline-ApplicationAccount -ExternalEmailAddress SfBOnline-ApplicationAccount@casiad.com
Set-MailUser -Identity $user.Identity -HiddenFromAddressListsEnabled $True
New-ManagementRoleAssignment -Role UserApplication -User $user.Identity
New-ManagementRoleAssignment -Role ArchiveApplication -User $user.Identity
```

## Step 2: Create and Enable a Partner Application for Skype for Business Online

Next, you need to create a new partner application and link it to the mail user account you just created. Run the following command in Exchange PowerShell within your on-premises Exchange organization:

```powershell
New-PartnerApplication -Name SfBOnline -ApplicationIdentifier 00000004-0000-0ff1-ce00-000000000000 -Enabled $True -LinkedAccount $user.Identity
```

## Step 3: Export the On-Premises Authorization Certificate

The next step involves exporting the on-premises authorization certificate, which will later be imported into your Skype for Business Online organization:

```powershell
$thumbprint = (Get-AuthConfig).CurrentCertificateThumbprint
if((test-path $env:SYSTEMDRIVE\OAuthConfig) -eq $false) {
    md $env:SYSTEMDRIVE\OAuthConfig
}
cd $env:SYSTEMDRIVE\OAuthConfig
$oAuthCert = (dir Cert:\LocalMachine\My) | where {$_.Thumbprint -match $thumbprint}
$certType = [System.Security.Cryptography.X509Certificates.X509ContentType]::Cert
$certBytes = $oAuthCert.Export($certType)
$CertFile = "$env:SYSTEMDRIVE\OAuthConfig\OAuthCert.cer"
[System.IO.File]::WriteAllBytes($CertFile, $certBytes)
```

## Step 4: Upload the On-Premises Authorization Certificate to Microsoft Entra ACS

This is the critical step where issues have been noted when using the MSGraph module. The following MSOL module code is known to work correctly:

:::warning[Important]

The MSOnline module is only compatible with Windows Powershell. (It is not compatible with Powershell Core)

:::

```powershell
Install-Module MSOnline -Scope CurrentUser
Connect-MsolService
$CertFile = "$env:SYSTEMDRIVE\OAuthConfig\OAuthCert.cer"
$objFSO = New-Object -ComObject Scripting.FileSystemObject
$CertFile = $objFSO.GetAbsolutePathName($CertFile);
$cer = New-Object System.Security.Cryptography.X509Certificates.X509Certificate
$cer.Import($CertFile)
$binCert = $cer.GetRawCertData();
$credValue = [System.Convert]::ToBase64String($binCert)
$ServiceName = "00000004-0000-0ff1-ce00-000000000000"
$p = Get-MsolServicePrincipal -AppPrincipalId $ServiceName
New-MsolServicePrincipalCredential -ServicePrincipalName $p.AppPrincipalId -Type Asymmetric -Usage Verify -Value $credValue
```

## Step 5: Verify the Certificate Upload

Finally, verify that the certificate has been successfully uploaded to the Skype for Business service principal:

```powershell
Get-MsolServicePrincipalCredential -AppPrincipalId $p.AppPrincipalId -ReturnKeyValues $true | select *
```

## Conclusion
By carefully following these steps using the MSOL module, you can resolve the delegate scheduling error and ensure smooth integration between on-premises Exchange and Microsoft Teams. While the shift to MSGraph is on the horizon, the MSOL module remains a reliable solution for this particular issue.

Stay tuned for future updates as we continue to explore the best practices for maintaining a seamless hybrid environment.

<Comments />
