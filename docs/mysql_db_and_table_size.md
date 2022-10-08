---
id: mysql_db_and_table_size
title: Get database and table sizes
slug: /
---

## Single database size

```mysql
SELECT TABLE_SCHEMA AS `Database`,
ROUND(SUM(DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS `Size (MB)`
FROM information_schema.TABLES
WHERE TABLE_SCHEMA="<database name>";
```

## All database sizes

```mysql
SELECT TABLE_SCHEMA AS `Database`,
ROUND(SUM(DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS `Size (MB)`
FROM information_schema.TABLES
GROUP BY TABLE_SCHEMA
ORDER BY SUM(DATA_LENGTH + INDEX_LENGTH) DESC;
```

## Table size for single database

```mysql
SELECT TABLE_NAME AS `Table`,
ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS `Size (MB)`
FROM information_schema.TABLES
WHERE table_schema = "<database name>"
ORDER BY (data_length + index_length) DESC;
```

## Source

[https://phoenixnap.com/kb/mysql-database-size](https://phoenixnap.com/kb/mysql-database-size)

<Comments />
