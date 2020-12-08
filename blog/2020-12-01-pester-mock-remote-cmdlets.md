---
slug: pester-mock-remote-cmdlets
title: Pester, mock remote or unavailable cmdlets
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'https://getps.dev/img/Hannes_Profil_HighContrast.jpg'
author_url: https://getps.dev/about
tags: [powershell, pester, mock, remote, cmdlets]
description: Mocking the unmockable, mocking remote or unavailable cmdlets.
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/convert-datestringtodatetimeobject"
data-layout="button"
data-size="small">
</div>

There are a lot of forum post of people having a hard time mocking some cmdlets, either it is remote cmdlets imported by a session that is not available during testing, cmdlets that are not present on the development machine or simply some built in cmdlets that are hard to mock like Import-PSSession, Invoke-Command etc.

Mocking a cmdlet that are unavailable on the development machine is quite straight forward by just declaring a dummy function before the mock.

```powershell
function Get-Foo {
    $Mailboxes = Get-Mailbox
}

Describe -Name "Foo" -Fixture {
    BeforeAll {
        function Get-Mailbox {}
        Mock Get-Mailbox -MockWith {
            # return fake mailbox object
        }
    }
    It -Name "Bar" -Test {
        { Get-Foo } | should -not -throw
    }
}
```

The same method can be applied when mocking a built in cmdlet that will fail parameter validation which happends even though the cmdlets is mocked

```powershell
function Get-Foo {
    $Session = New-PSSession
    Import-PSSession -Session $Session
}

Describe -Name "Foo" -Fixture {
    BeforeAll {
        Mock New-PSSession -MockWith {}
        Mock Import-PSSession -MockWith {}
    }
    It -Name "Bar" -Test {
        { Get-Foo } | should -not -throw
    }
}
```

```
[-] Foo.Bar 51ms (49ms|1ms)
 Expected no exception to be thrown, but an exception "Cannot validate argument on parameter 'Session'. The argument is null. Provide a valid value for the argument, and then try running the command again." was thrown from C:\Users\hanpalmq\OneDrive - Crayon Group\Desktop\temp.ps1:3 char:31
     +     Import-PSSession -Session $Session
     +                               ~~~~~~~~.
 at { Get-Foo } | should -not -throw, C:\Users\hanpalmq\OneDrive - Crayon Group\Desktop\temp.ps1:12
 at <ScriptBlock>, C:\Users\hanpalmq\OneDrive - Crayon Group\Desktop\temp.ps1:12
Tests completed in 214ms
Tests Passed: 0, Failed: 1, Skipped: 0 NotRun: 0
```

The error states that Import-PSSession requires valid PSSession object to be passed to the session parameter. Again we need to define a dummy function that don't expects a PSSession object to be passed.

```powershell
function Get-Foo {
    $Session = New-PSSession
    Import-PSSession -Session $Session
}

Describe -Name "Foo" -Fixture {
    BeforeAll {
        function Import-PSSession {}
        Mock New-PSSession -MockWith {}
        Mock Import-PSSession -MockWith {}
    }
    It -Name "Bar" -Test {
        { Get-Foo } | should -not -throw
    }
}
```
