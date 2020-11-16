---
id: quickstart
title: Quick start
---

# What is PS.Tools.DataSet

This modules provides tools for interacting with .NET datasets 
from powershell. .NET 5.0 (and earlier) provides resource to work 
with data sets and tables. To make it easier to interact with the 
constructors, methods, properties etc this module was developed to
powershell-ify the syntax of working with these resources.

## Why should I use DataSets and DataTables?

Powershell provides built-in methods of working with, manipulating and 
store data. Array, Collections, Lists, HashTables, Dictionaries etc. 
They all have their use cases, strengts and weaknesses. One of the 
weeknesses that all of them suffers from is very large data structures 
and the resulting resource utilization and performance limitations.

When working with datatables with let's say 20 000 items and 60 properties each 
the methods above will turn really slow and quite possible make the
powershell host reach the memory limit. (Default 2048 MB for v5).

Obviously a SQL server or similar would be a good candidate to store 
such data sets but it is not always possible and sometimes you are 
forces to manage large data sets in memory.

The best way of handling these large data sets that I found was 
the .NET datasets and datatables. That is the reason why this module
was born. This module is a wrapper for these .NET classes.