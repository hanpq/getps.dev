---
id: quickstart
title: Quick start
---

# What is pstools.queue

pstools.queue is a wrapper module for the .Net class System.Collections.Queue. This module mainly provides two benefits, the first is to make it easy to utilize the queue class in a powershell syntax way. The second reason is that queue objects created with this module adds additional functionality like metrics for items added and removed, counters for items added and removed per second and velocity. Every time an item is added or removed these performance metrics are calculated. This of course adds a small overhead and decreases performance and is very marginal. Unless the queue will process more than tens of thousands of addition and removals per sec it will not be noticeable.
