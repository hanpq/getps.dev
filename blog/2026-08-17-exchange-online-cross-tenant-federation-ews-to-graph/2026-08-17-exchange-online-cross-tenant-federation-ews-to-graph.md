---
slug: exchange-online-cross-tenant-federation-ews-to-graph
title: Migrating Exchange Online Cross-Tenant Federation from EWS to Microsoft Graph
authors: hanpq
tags: [Exchange Online, Microsoft Graph, Cross-Tenant Federation, PowerShell]
keywords: [Exchange Online, EWS retirement, Microsoft Graph, cross-tenant federation, cross-tenant access policy, free/busy, MailTips, calendar sharing, Microsoft Graph PowerShell]
description: How to migrate Exchange Online cross-tenant federation from EWS to Microsoft Graph, including how to handle existing cross-tenant access policy partner relationships.
---

<div class="fb-share-button"
data-href="https://www.getps.dev/blog/exchange-online-cross-tenant-federation-ews-to-graph"
data-layout="button"
data-size="small">
</div>

With the announcement of the retirement of EWS in Exchange Online, tenant-to-tenant federation needs to be migrated from the EWS-based federation model to Microsoft Graph-based federation.

Microsoft provides guidance on how to configure this migration. However, there are a couple of nuances that the documentation does not cover in detail. In particular, the required Microsoft Graph PowerShell Beta module and the scenario where a cross-tenant access policy partner relationship already exists are not covered. The Microsoft documentation assumes that you are configuring the relationship from a clean slate.

## Required Microsoft Graph PowerShell modules

Before starting, make sure that both the `Microsoft.Graph` and `Microsoft.Graph.Beta` PowerShell modules are installed.

The commands required for this procedure are currently only available through the Beta module. However, you still need the standard Microsoft Graph module because it provides the authentication functionality and the underlying `Microsoft.Graph.Authentication` module required to connect to Microsoft Graph.

It is also important to keep the versions of `Microsoft.Graph` and `Microsoft.Graph.Beta` in sync, as the two modules have dependencies on each other.

You can verify the installed versions with:

```powershell
Get-InstalledModule Microsoft.Graph, Microsoft.Graph.Beta
```

## Creating the cross-tenant partner relationship

Following Microsoft's migration guidance, this is the step to create the partner trust:

```powershell
$partnerId = "<partnerTenantId>" 
$body = @{ 
    tenantId = $partnerId
    m365CollaborationInbound = @{ 
        users = @{ 
            accessType = "allowed" 
            targets = @( 
                @{ 
                    target = "AllUsers" 
                    targetType = "user" 
                } 
            ) 
        } 
    } 
} 
New-MgBetaPolicyCrossTenantAccessPolicyPartner -BodyParameter $body
```

If you have previously configured cross-tenant sharing with the partner tenant, the partner relationship may already exist. In that case, attempting to create it again will result in an error similar to the following:

```text
New-MgBetaPolicyCrossTenantAccessPolicyPartner_Create: Another object with the same value for property tenantId already exists.

Status: 409 (Conflict)
ErrorCode: Request_MultipleObjectsWithSameKeyValue
Date: <date>

Headers:
Cache-Control                 : no-cache
Transfer-Encoding             : chunked
Vary                          : Accept-Encoding
Strict-Transport-Security     : max-age=31536000
request-id                    : <uuid>
client-request-id             : <uuid>
x-ms-ags-diagnostic           : 
Link                          : 
Deprecation                   : <date>
Sunset                        : <date>
x-ms-resource-unit            : 1
Date                          : <date>


  Recommendation: See service error codes: https://learn.microsoft.com/graph/errors
```

You can verify this by retrieving all existing partner trusts using the following command:

```powershell
$PartnerTrust = Get-MgBetaPolicyCrossTenantAccessPolicyPartner -CrossTenantAccessPolicyConfigurationPartnerTenantId <partner tenant id>
```

To determine if you need to update the partner trust you must drill down the properties and see if it differs from what you are trying to set:

```powershell
$PartnerTrust.M365CollaborationInbound.Users.AccessType

allowed

$PartnerTrust.M365CollaborationInbound.Users.Targets

Target    TargetType
------    ----------
AllUsers  user
```

If this shows up empty or is not the expected settings, continue updating the partner trust.

## Updating an existing partner relationship

If the partner relationship already exists, there is no need to delete it and create a new one. Instead, update the existing relationship with the required configuration.

Use the following command:

```powershell
$partnerId = "<partnerTenantId>"
$body = @{
  m365CollaborationInbound = @{
    users = @{
      accessType = "allowed"
      targets = @(
          @{ target = "AllUsers"; targetType = "user" }
      )
    }
  }
}

Update-MgBetaPolicyCrossTenantAccessPolicyPartner -CrossTenantAccessPolicyConfigurationPartnerTenantId $partnerId -BodyParameter $body
```

The important difference here is that `Update-MgBetaPolicyCrossTenantAccessPolicyPartner` is used instead of `New-MgBetaPolicyCrossTenantAccessPolicyPartner`. The tenant ID is supplied through `-CrossTenantAccessPolicyConfigurationPartnerTenantId` rather than as part of the request body.

Once the existing partner relationship has been updated, you can continue with Microsoft's migration procedure and configure the required cross-tenant policies for **free/busy information, MailTips, and calendar sharing**.

This is particularly important when migrating an existing configuration, as the partner relationship created for previous cross-tenant sharing scenarios can already exist even though the new Microsoft Graph-based federation configuration has not yet been applied.

[Migrate to Microsoft 365 Cross-Tenant Access Policy for sharing Free/Busy, Calendars, and MailTips | Microsoft Learn](https://learn.microsoft.com/en-gb/exchange/sharing/migrate-to-m365-xtap)
