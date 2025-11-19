## Notes

- The dispatcher thread starts the first time a `Write-Log` command is executed and keeps running in the background to dispatch new messages until the module is removed.
- The runspace code is inspired by the work and research of Boe Prox (@proxb).
