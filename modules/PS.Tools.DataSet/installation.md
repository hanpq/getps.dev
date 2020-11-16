﻿---
id: installation
title: Installation and Update
---

## Installing from PSGallery

The easiest way to install the module is to use PowerShellGet cmdlet <code>Install-Module</code> from PSGallery. 

```powershell
Install-Module PS.Tools.DataSet -Scope CurrentUser
```

To update the module to a new version you can use the <code>Update-Module</code> cmdlet.

```powershell
Update-Module PS.Tools.DataSet
```

## Installing manually

If it is not possible to install the module using <code>Install-Module</code> it is possible to manually download the module as a zip-file from the [downloads](../../src/pages/Downloads) secion or from <a target="_blank" href={require('../static/assets/PS.Tools.DataSet.latest.zip').default}> this link </a>.
