---
slug: new-module-psimmich
title: Work with the Immich API from Powershell
authors: hanpq
tags: [powershell,immich,psimmich]
keywords: [powershell,immich,psimmich]
description: Work with the Immich API from Powershell
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/new-module-psimmich"
data-layout="button"
data-size="small">
</div>

# PSImmich Module

I've put together a new powershell module which allows you to work with the Immich API. With the API easily accessible you can now write automations for your image gallery. The module has approx 85% API coverage where the remaining 15% is mainly used by the Immich Web application and or mobile app.

You can manage users, assets, albums, libraries, partners, api-keys, activities, configuration, start jobs, sharing links, tags etc.

You can build quite powerful automations for your image gallery, some examples;

- Automatically create and update albums based on folder structure, exif metadata like tags/keywords
  - For instance, I have a filewatcher script that monitors my on-disk image library, if an image is written/modified on disk, the image keywordw is retrieved with exiftool and if the image has a keyword beginning with "Album_*" it extract the album name, makes sure the album exist in Immich and then makes sure the image is a member of that album. With this script I can update keywords in an external application (in my case Adobe Lightroom) and have those changes reflected in Immich. I plan on publishing a blog post with more details about this setup.
- Download/Upload assets
- Hide/Trash/Favorite assets
- Manage album/asset sharing
- With a filewatcher you can instruct Immich to refresh thumbnails and/or metadata for an external asset when it is updated/changed.

```powershell
Install-Module PSImmich -Scope CurrentUser
```

[PSImmich Module Docs](https://getps.dev/modules/PSImmich/getstarted)

<Comments />
