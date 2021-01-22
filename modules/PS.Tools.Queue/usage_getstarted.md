---
id: usage_getstarted
title: Get started
---

Start by initialize a new queue object

``` powershell
$Queue = Initialize-Queue
```

To add a new item to the queue use Add-QueueItem

``` powershell
Add-QueueItem -Queue $Queue -Item 'Foo'
```

To retreive the next item in queue use Get-NextQueueItem

``` powershell
$NextItemToProcess = Get-NextQueueItem -Queue $Queue
```

You can also "peek" at the next item in queue by using Show-NextQueueItem, the difference from Get-NextQueueItem is that the next item in queue is retreived but remains in the queue.

``` powershell
$NextItemInQueue = Show-NextQueueItem -Queue $Queue
```

You have two methods of emptying the queue, either by retreiving all items (Get-AllQueueItems) or by discarding all items (Clear-AllQueueItems)
``` powershell

# This will retreive all items and dequeue the items. 
$AllRemainingQueueItems = Get-AllQueueItems -Queue $Queue

# This will also clear the queue but it does not return any items for the queue and is therefor faster
Clear-AllQueueItems -Queue $Queue

```

You can show performance metrics by using Measure-Queue
``` powershell
Measure-Queue -Queue $Queue
```


