---
slug: where-object-is-slow
title: Where-Object is slow...
authors: hanpq
tags: [powershell, where-object, function, performance, optimization]
keywords: [powershell, where-object, function, performance, optimization]
description: A faster search function replacing edge cases of where-object
---

<div class="fb-share-button"
data-href="https://getps.dev/blog/where-object-is-slow"
data-layout="button"
data-size="small">
</div>

One thing that I have been struggling with from time to time is that the cmdlet Where-Object is incredibly slow to filter massive datasets. Lets say you have custom PSObject array with 50000 objects and 20 properties each. If you would cross referencing this table with another large dataset using the Where-Object cmdlet for each lookup it would take ages.

One day I had to do such a comparison and I was forced to come up with an alternate way of retrieving matches, so I developed a new function that is much faster than the Where-Object cmdlet.

Lets say you have a CSV-file containing 50000 rows and 20 columns with one column being a GUID. First you need to create an index:

```powershell
$CSVIndex = $CSV.GUID.ToLower()
```

Once that is done the search can be started using the cmdlet below:

```powershell
Fast-Search -Database $CSV -DatabaseIndex $CSVIndex -SearchString "A52FB-...-27422"
```

This is how the function is defined

```powershell
function Fast-Search {
param(
   $Database,
   $DatabaseIndex,
   $SearchString
)

   $Array = @()
   $Index = 0

   while ($Index -ne -1) {
      $Index = system.array]::IndexOf($DatabaseIndex,$SearchString,$Index)
      if ($Index -ne -1) {
         $Array += $Index
         $Index++
      }
   }
   $Array | ForEach-Object {
      $Database[$_]
   }
}
```

What makes the function so much faster you might ask..

First of, the key is that the dataset and the dataset index does not change order internally in the array as we assume that the item on Index=X is the same item both in the dataset and the dataset index.

So what we do is to search for the SearchString only in the dataset index, this in itself i much faster as it does not have to process as much data. Then we use the method IndexOf of the dataset index. This is also quite fast localizing the first row that matches the SearchString. Then we save that index in another array, lets call it the result array. When that is done we continue to search for the next match after the last result. This process is repeated until we reach the end of the dataset index.

We then have an array of indexes with the “index numbers” of the rows that match the SearchString. The Last thing we need to do is to collect the rows from the large dataset using array index targeting.

```powershell
$SomeArray[$TheIndexThatWeWantToRetreive]
```

And last but not least, we return all the objects from the dataset.

In some cases I have had performance benefits by using this method by up to 80 times compared to using Where-Object. The drawback is that it isn’t a built-in cmdlet so you have to declare the function and also you need to build an index manually and last that you can only search in one property at a time, the index that you created. You should only use this method for the specific use cases when you have two very large datasets where the key isn’t unique. The function can also be developed further to accept two or more indexes in case you need to search for more than one property.

A similar solution is to use a hashtable as dataset index lookup table and simply store the index value as key and the whole object as the value of the key. This method is quite easy to use however it has one drawback; keys must be unique. So if you need to search a large dataset fast where you expect more than one result based on the index this function give you really fast searches.

<Comments />
