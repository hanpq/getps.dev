---
id: classes
title: Classes
---

## Defining a base class

```powershell
class Vehicle
{
    [string]$type
    [string]$make
}
```

## Defining a child class

```powershell
class Car : Vehicle
{
    [String]$vin                        # String property
    static [int]$numberOfWheels = 4     # Static integer property
    [int]$numberOfDoors                 # Integer property
    [datetime]$year                     # Datetime property
    [MakeOfCar]$make                    # An OVERRIDE of the parent make property
    [ColorOfCar]$color                  # An enum propery
    hidden [bool]$IsItAGoodCar          # hidden property only accessible inside the class

    # This is OVERLOAD constructors, the first one allows empty construction, the following is constructor OVERLOADS
    Car ()
    {
    }

    Car ([string]$vin)
    {
        $this.vin = $vin
    }

    #This is a static method of the car class
    static SoundHorn ()
    {
        [console]::beep(800, 900)
    }

    # This is another metod of the car class
    Accelerate ($arg)
    {
        100..($arg * 100) |
        ForEach-Object {
            if (($_ % 100) -eq 0)
            {
                [console]::beep($_, 101)
            }
        }
    }
}
```

## Defining enums

```powershell
enum MakeOfCar
{
    Chevy = 1
    Ford = 2
    Olds = 3
    Toyota = 4
    BMW = 5
}

Enum ColorOfCar
{
    Red = 1
    Blue = 2
    Green = 3
}
```

## Construct object from class

```powershell
$a = [car]::New()
$a = [car]::New(1234)
$a = New-Object -TypeName car -ArgumentList 1234 -Property @{
    type = 'sedan'
}
```

## Assign values to non static properties

```powershell
$a = [car]::New()
$a = [car]::New(1234)
$a = New-Object -TypeName car -ArgumentList 1234 -Property @{
    type = 'sedan'
}
```

## Retreive static properties

```powershell
$a::numberOfWheels
[car]::numberOfWheels
```

## Call method
```powershell
$a.SoundHorn()
$a.Accelerate(25)
```

## Call static methods
```powershell
[car]::SoundHorn()
```

## Call methods directly after construction
```powershell
[car]::new().SoundHorn()
[car]::new().Accelerate(50)
(New-Object -TypeName Car).Accelerate(50)
```

<Comments />
