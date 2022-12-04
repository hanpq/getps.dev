---
slug: windows-terminal-unable-to-write-certain-symbols
title: Unable to write certain characters in Windows Terminal
authors:
  - name: Hannes Palmquist
    title: Senior Consultant Cloud
    url: https://getps.dev/about
    image_url: https://getps.dev/img/Hannes_Profil_HighContrast.jpg
tags: [powershell,windows,terminal,windows terminal,keyboard,character]
keywords: [powershell,windows,terminal,windows terminal,keyboard,character]
description: Unable to write certain characters in Windows Terminal
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/ps-tools-queue-module"
data-layout="button"
data-size="small">
</div>

Recently I noticed a strange issue within Windows Terminal where I were unable to write the "$" sign using Ctrl+Alt+4. (Swedish keyboard layout has Ctrl+Alt+4 as the key combination to write a $ sign). However a workaround was to use Altgr+4 instead which worked fine. This issue was isolated to Windows Terminal as there were no issue writing $ in any other application, ie, notepad, vscode etc.

Luckely the issue for me was simple, with some update to Windows Terminal the development team hi-jacked the shortcut Ctrl+Alt+4 for changing to tab number 3. I removed the shortcut keybinding from the settings page and vola, Ctrl+Alt+4 started working as a $-dollar sign again.

Settings -> Actions -> Look for a shortcut for the key combination that is not working.

The same issue would arise for all keyboard layouts using Ctrl+Alt+X for a character.

In the case of Scandinavian keyboard layouts the following characters is probably affected.
- Ctrl+Alt+2 -> @
- Ctrl+Alt+3 -> £
- Ctrl+Alt+4 -> $
- Ctrl+Alt+7 -> {
- Ctrl+Alt+8 -> [
- Ctrl+Alt+9 -> ]

I though I'd share if anyone else stumbles upon this.

<Comments />
