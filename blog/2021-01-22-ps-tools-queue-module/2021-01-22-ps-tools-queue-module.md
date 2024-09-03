---
slug: ps-tools-queue-module
title: Introducing PSQueue
authors: hanpq
tags: [powershell,module,queue,cmdlet,function,system.collection.queue]
keywords: [powershell,module,queue,cmdlet,function,system.collection.queue]
description: Introducing wrapper module for queue
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/ps-tools-queue-module"
data-layout="button"
data-size="small">
</div>

Recently I developed a tool that utilizes the .NET class system.collections.queue. The function runs continously and produces workitems that should be processed in sequence and in the same order they were added. One simple way to acheive this is to use the collection queue. This class provides a simple way to add items to the queue and retrieve the oldest item when needed.

For fun I wanted to create a wrapper for the queue class so that it can be used in a powershell style syntax. Additionally i missed functionality to see the rate and velocity that items were added and removed to the queue.

Queue objects created with this module contains metrics for count of added and removed items, rate of added and removed items and velocity.

[![Repo](https://img.shields.io/badge/Repo-pstools.queue-success?logo=github)](https://github.com/hanpq/pstools.queue) <br/>
[![Docs](https://img.shields.io/badge/Docs-pstools.queue-success?logo=read-the-docs)](https://getps.dev/modules/pstools.queue/quickstart) <br/>
[![PowerShell Gallery](https://img.shields.io/powershellgallery/v/pstools.queue?label=PSGallery&logo=powershell)](https://www.powershellgallery.com/packages/pstools.queue)

<Comments />
