---
id: usage_getstarted
title: Get started
---

## Create one or more tables

To get started we need to create a table

```powershell
$DataTable = New-DataTable -TableName 'UsersTable'
```

## Add columns to tables

Next we need to add a few columns to the table. First we'll 
add a few plain columns. Secondly we will add a column with 
an expression. This expression concatinates firstname and 
lastname to a displayname. Last we will add a column that has 
a default value in case nothing is set. 

```powershell
Add-DataTableColumn -DataTable $DataTable -Names 'ID','FirstName','LastName'
Add-DataTableColumn -DataTable $DataTable -Names 'DisplayName' -Expression "[FirstName] + ' ' + [LastName]"
Add-DataTableColumn -DataTable $DataTable -Names 'DefaultTheme' -DefaultValue 'Blue'
```

## Add rows to tables

Now that we have a basic strucutre in our users table we can start 
to add rows. The <code>Add-DataTableRow</code> cmdlet accepts 
psobjects as input. The object should contains properties 
corresponding to columns in the DataTable.

```powershell
$NewRow = [pscustomobject]@{
    ID = 1
    FirstName = 'Will'
    LastName = 'Smith'
}
$NewRow | Add-DataTableRow -DataTable $DataTable
```

The content of the data table is now

```powershell
$DataTable | Format-Table

ID FirstName LastName DisplayName DefaultTheme
-- --------- -------- ----------- ------------
 1 Will      Smith    Will Smith  Dark
```

## Create a dataset

In case several data tables are needed a data set can be 
created. A data set can be viewed as a container of data 
tables and provides a few extra capabilities like data 
table relations. To create a data set and add tables run 
the following commands.

```powershell
$DataSet = New-DataSet
Add-DataSetTable -Dataset $Dataset -DataTable $DataTable
```
