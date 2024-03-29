# Fass manual

## Constants
```  
const foobar = $EA
data 0, foobar, $FF, 0
A = foobar
```
A constant is a name that has a value that can't change.  
As constants are primarily used as literal _(or immediate)_ values for instructions and as such can only be 1 byte long, I.E. from -128 to 255  

Constants are accessible from the point they are defined onwards. You can't use a constant before defining it.  
