---
slug: exchange-recipienttypes
title: Exchange RecipientTypes
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'https://getps.dev/img/Hannes_Profil_HighContrast.jpg'
author_url: https://getps.dev/about
tags: [Exchange, RecipientType, Office365, ExchangeOnline]
description: Below are all current recipient types. Please comment below if you miss an entry in any of the tables.
---

<div class="fb-share-button" 
data-href="https://getps.dev/blog/exchange-recipienttypes" 
data-layout="button" 
data-size="small">
</div>

Below are all current recipient types. Please comment below if you miss an entry in any of the tables.

## msExchRecipientDisplayType

| DisplayName                                                         | Name                           | Value       |
| ------------------------------------------------------------------- | ------------------------------ | ----------- |
| ACL able Mailbox User                                               | ACLableMailboxUser             | 1073741824  |
| Security Distribution Group                                         | SecurityDistributionGroup      | 1043741833  |
| Equipment Mailbox                                                   | EquipmentMailbox               | 8           |
| Conference Room Mailbox                                             | ConferenceRoomMailbox          | 7           |
| Remote Mail User                                                    | RemoteMailUser                 | 6           |
| Private Distribution List                                           | PrivateDistributionList        | 5           |
| Organization                                                        | Organization                   | 4           |
| Dynamic Distribution Group                                          | DynamicDistributionGroup       | 3           |
| Public Folder                                                       | PublicFolder                   | 2           |
| Distribution Group                                                  | DistrbutionGroup               | 1           |
| Mailbox User                                                        | MailboxUser                    | 0           |
| Synced Universal Security Group as Universal Security Group         | SyncedUSGasUSG                 | -1073739511 |
| ACL able Synced Universal Secuirty Group as Contact                 | ACLableSyncedUSGasContact      | -1073739514 |
| ACL able Synced Remote Mail User                                    | ACLableSyncedRemoteMailUser    | -1073740282 |
| ACL able Synced Mailbox User                                        | ACLableSyncedMailboxUser       | -1073741818 |
| Synced Universal Security Group as Contact                          | SyncedUSGasContact             | -2147481338 |
| Synced Universal Security Group as Universal Distribution Group     | SyncedUSGasUDG                 | -2147481343 |
| Synced Equipment Mailbox                                            | SyncedEquipmentMailbox         | -2147481594 |
| Synced Conference Room Mailbox                                      | SyncedConferenceRoomMailbox    | -2147481850 |
| Synced Remote Mail User                                             | SyncedRemoteMailUser           | -2147482106 |
| Synced Dynamic Distribution Group                                   | SyncedDynamicDistributionGroup | -2147482874 |
| Synced Public Folder                                                | SyncedPublicFolder             | -2147483130 |
| Synced Universal Distribution Group as Contact                      | SyncedUDGasContact             | -2147483386 |
| Synced Universal Distribution Group as Universal Distribution Group | SyncedUDGasUDG                 | -2147483391 |
| Synced Mailbox User                                                 | SyncedMailboxUser              | -2147483642 |

## msExchRecipientTypeDetails

| DisplayName                                   | Name                           | Value        |
| --------------------------------------------- | ------------------------------ | ------------ |
| Team Mailbox                                  | TeamMailbox                    | 137438953472 |
| Remote Shared Mailbox                         | RemoteSharedMailbox            | 34359738368  |
| Remote Equipment Mailbox                      | RemoteEquipmentMailbox         | 17179869184  |
| Remote Equipment Mailbox (IncorrectValue)     | RemoteEquipmentMailbox         | 17173869184  |
| Remote Room Mailbox                           | RemoteRoomMailbox              | 8589934592   |
| Remote User Mailboxï¿½ï¿½ï¿½ï¿½ï¿½            | RemoteUserMailbox              | 2147483648   |
| Role Group                                    | RoleGroup                      | 1073741824   |
| Discovery Mailbox                             | DiscoveryMailbox               | 536870912    |
| Room List                                     | RoomList                       | 268435456    |
| Linked User                                   | LinkedUser                     | 33554432     |
| Mailbox Plan                                  | MailboxPlan                    | 16777216     |
| Arbitration Mailbox                           | ArbitrationMailbox             | 8388608      |
| Microsoft Exchange                            | MicrosoftExchange              | 4194304      |
| Disabled User                                 | DisabledUser                   | 2097152      |
| Non-Universal Group                           | NonUniversalGroup              | 1048576      |
| Universal Security Group                      | UniversalSecurityGroup         | 524288       |
| Universal Distribution Group                  | UniversalDistributionGroup     | 262144       |
| Contact                                       | Contact                        | 131072       |
| User                                          | User                           | 65536        |
| Cross-Forest Mail Contact                     | MailForestContact              | 32768        |
| System Mailbox                                | SystemMailbox                  | 16384        |
| System Attendant Mailbox                      | SystemAttendantMailbox         | 8192         |
| Public Folder                                 | Public Folder                  | 4096         |
| Dynamic Distribution Group                    | DynamicDistributionGroup       | 2048         |
| Mail-Enabled Universal Security Group         | MailUniversalSecurityGroup     | 1024         |
| Mail-Enabled Non-Universal Distribution Group | MailNonUniversalGroup          | 512          |
| Mail-Enabled Universal Distribution Group     | MailUniversalDistributionGroup | 256          |
| Mail User                                     | MailUser                       | 128          |
| Mail Contact                                  | MailContact                    | 64           |
| Equipment Mailbox                             | EquipmentMailbox               | 32           |
| Room Mailbox                                  | RoomMailbox                    | 16           |
| Legacy Mailbox                                | LegacyMailbox                  | 8            |
| Shared Mailbox                                | SharedMailbox                  | 4            |
| Linked Mailbox                                | LinkedMailbox                  | 2            |
| User Mailbox                                  | UserMailbox                    | 1            |

## msExchRemoteRecipientType

| DisplayName                                                                    | Value |
| ------------------------------------------------------------------------------ | ----- |
| Migrated, SharedMailbox                                                        | 100   |
| SharedMailbox                                                                  | 96    |
| Migrated Equipment Mailbox                                                     | 68    |
| Provisioned Equipment Mailbox                                                  | 65    |
| EquipmentMailbox                                                               | 64    |
| Migrated Room Mailbox                                                          | 36    |
| Provisioned Room Mailbox                                                       | 33    |
| RoomMailbox                                                                    | 32    |
| DeprovisionArchive, Migrated User Mailbox                                      | 20    |
| DeprovisionArchive                                                             | 16    |
| DeprovisionMailbox                                                             | 8     |
| Migrated User Mailbox, ProvisionedArchive (Migrated MBX & Cloud Archive)       | 6     |
| Migrated User Mailbox                                                          | 4     |
| Provisioned User Mailbox, Provisioned User Archive (Cloud MBX & Cloud Archive) | 3     |
| ProvisionedArchive (Cloud Archive)                                             | 2     |
| Provisioned User Mailbox (Cloud MBX)                                           | 1     |
