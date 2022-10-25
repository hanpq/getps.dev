---
slug: announcing-psportainer
title: Announcing PSPortainer Powershell Module
author: Hannes Palmquist
author_title: Senior Consultant Cloud
author_image_url: 'https://getps.dev/img/Hannes_Profil_HighContrast.jpg'
author_url: https://getps.dev/about
tags: [powershell,portainer,psportainer,rest,api,docker,module]
description: Powershell module to interact with Portainer API
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/announcing-psportainer"
data-layout="button"
data-size="small">
</div>

Some time ago I wanted to automate a process where I needed check status of a few docker containers managed with Portainer and noticed that there was no powershell module available on the gallery for portainer. A couple of minutes later I had discovered the Portainer Rest API and though that it could be a fun project to provide powershell users with the ability to manage their Portainer and Docker instances with powershell.

So here it is, an early pre-release/work in progress powershell module for Portainer, ***PSPortainer***

If you want to contribute to the project it is publically available on GitHub [here](https://github.com/hanpq/PSPortainer)

To get started, visit the docs for the module at [getps.dev](https://getps.dev/modules/PSPortainer/usage_getstarted) or start exploring directly by installing the module from PSGallery

```powershell
Install-Module PSPortainer -Scope CurrentUser
```

<Comments />
