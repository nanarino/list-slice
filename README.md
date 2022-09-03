# list-slice

implementation of Python built-in type : `list.__getitem__` and `list.__setitem__`


## Install

```
$ pnpm install list-slice
```

## Usage

```js
import { getitem, setitem } from "list-slice"
```

### getitem

Python built-in list sub: `list[start:stop:step]`

Or writing `__getitem__(self, slice(start, stop[, step]))`

```python
list.__getitem__([1,2,3,4,5], slice(2, None)) # [3, 4, 5]
list.__getitem__([1,2,3,4,5], slice(3, None, -1)) # [4, 3, 2, 1]
```

in my javascript :`getitem(arr, [start, stop, step])`

```js
getitem([1, 2, 3, 4, 5], [2, null]) // [3, 4, 5]
getitem([1, 2, 3, 4, 5], [3, null, -1]) // [4, 3, 2, 1]
```

### setitem

And `list[start:stop:step] = new_list`

or writing `__setitem__(self, slice(start, stop[, step]), new_list)`

```python
arr = [1, 3, 4, 5]
list.__setitem__(arr, slice(None, None), [7, 8, 9])
print(arr) # [3, 4, 5]
list.__setitem__(arr, slice(2, None), [7, 8, 9])
print(arr) # [7, 8, 7, 8, 9]
```

in my javascript :`setitem(arr, [start, stop, step], newArr)`

```js
const arr = [1, 3, 4, 5]
setitem(arr, [], [7, 8, 9])
console.log(arr) // [7, 8, 9]
setitem(arr, [2, null], [7, 8, 9])
console.log(arr) // [7, 8, 7, 8, 9]
```

## Test

Cover 100%

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.ts |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------