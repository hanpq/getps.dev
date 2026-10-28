### Ntfy

Publishes formatted notifications to an [ntfy](https://ntfy.sh/) server using its [JSON publishing API](https://docs.ntfy.sh/publish/#publish-as-json). The target supports Windows, Linux, and macOS, and can publish to hosted or self-hosted servers.

Messages are sent as UTF-8 JSON using HTTP POST to the server's base URL. The topic is included in the JSON payload, not appended to the URL.

#### Configuration options

| Option           | Type         | Mandatory | Default        | Description                                                                                                                                                            |
| ---------------- | ------------ | :-------: | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Topic            | String       |    Yes    | None           | Topic name. Only letters, numbers, underscores, and hyphens are accepted.                                                                                              |
| Url              | String       |   Yes*    | None           | Absolute HTTP or HTTPS server base URL, not a topic URL. Self-hosted base paths are supported. Credentials, query strings, and fragments are not accepted in this URL. |
| Token            | String       |    No     | None           | ntfy access token, sent using bearer authentication.                                                                                                                   |
| Title            | String       |    No     | None           | Notification title. Supports PSLogs format tokens. Omitted when empty.                                                                                                 |
| Priority         | Int32        |    No     | `3`            | Notification priority from `1` (minimum) to `5` (maximum).                                                                                                             |
| NotificationTags | String array |    No     | Empty array    | ntfy notification tags, such as emoji names. These are separate from PSLogs routing tags.                                                                              |
| Level            | String       |    No     | Default Level  | Defines the lowest PSLogs logging level to publish.                                                                                                                    |
| Format           | String       |    No     | Default Format | Defines the notification message using PSLogs format tokens.                                                                                                           |
| Tags             | String array |    No     | `@('default')` | Standard PSLogs routing tags. Determines which log messages reach this target, not the tags displayed by ntfy.                                                         |

*The current plugin schema marks `Url` as optional, but it has no default and initialization requires a valid URL. Always supply `Url` when enabling this target.

#### Example

Replace the example server URL and topic with your own ntfy server and topic:

```powershell
Add-LoggingTarget -Type Ntfy -Configuration @{
    Url = 'https://ntfy.example.com'
    Topic = 'operations-alerts'
    Level = 'WARNING'
    Format = '[%{level}] %{message}'
    Title = 'PSLogs: %{level}'
    Priority = 4
    NotificationTags = [string[]] @('warning', 'computer')
}

Write-Log -Level WARNING -Message 'Disk space is low'
Wait-Logging
```

To use the public hosted service, set `Url = 'https://ntfy.sh'`. Do not include the topic in `Url`; use the separate `Topic` option.

#### Authentication

For a protected topic, provide an ntfy access token. Load it from an appropriate secret store or environment variable rather than hard-coding it in a script.

```powershell
Add-LoggingTarget -Type Ntfy -Configuration @{
    Url = 'https://ntfy.example.com'
    Topic = 'private-alerts'
    Token = $env:NTFY_TOKEN
    Level = 'ERROR'
}

Write-Log -Level ERROR -Message 'The scheduled backup failed'
Wait-Logging
```

Use HTTPS to protect tokens and notification contents in transit. On public servers, choose an unguessable topic or configure access controls: anyone who knows an unprotected topic name may be able to read its notifications.

#### Notification priority and tags

`Priority` controls ntfy's notification urgency. It does not change PSLogs level filtering, and it is not automatically mapped from the message's logging level.

| Priority | ntfy meaning |
| -------- | ------------ |
| 1        | Minimum      |
| 2        | Low          |
| 3        | Default      |
| 4        | High         |
| 5        | Maximum      |

Use `NotificationTags` for the tags sent to ntfy. Use `Tags` to route PSLogs messages:

```powershell
Add-LoggingTarget -Type Ntfy -UniqueName OperationsNotifications -Configuration @{
    Url = 'https://ntfy.example.com'
    Topic = 'operations-alerts'
    Level = 'ERROR'
    Tags = @('Operations')
    NotificationTags = @('warning')

Write-Log -Level ERROR -Message 'Database connection failed' -Tags Operations
Wait-Logging
```

Only messages that meet the target's level threshold and match its routing tags are published.

#### Publishing behavior

Each matching log message produces one HTTP request. This target does not batch or retry notifications. Server message-size limits, rate limits, and topic permissions apply. Avoid sending sensitive log data to an untrusted server or an unprotected topic.

See [Format](../Format.md) for format tokens, [Tags](../Tags.md) for message routing, and [Targets](./Targets.md) for multiple instances.
