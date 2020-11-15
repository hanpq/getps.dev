---
id: casting_datetime2
title: Casting DateTime Objects
---

When casting data (converting it to a different data type), PowerShell supports two approaches that can differ considerably.

```powershell
[DateTime]'12.1.2017'
'12.1.2017' -as [DateTime]
```

Both lines cast a string into a DateTime object. The first line represents a forceful cast. It will either succeed or fail, and it always uses culture-neutral format (US format), so it expects a month-day-year scheme.
The second line represents a "TryCast": the cast will either succeed or silently return $null. This cast honors the current locale, so if you run the code on a German system, the text is interpreted in a day-month-year scheme.