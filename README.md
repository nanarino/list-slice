# list-slice

> implementation of Python list sub : `list.__getitem__` and `list.__setitem__`


## Install

```
$ pnpm install list-slice
```

## Usage

```js
import { getitem, setitem } from "list-slice"
```

### getitem

- `getitem(arr, index)`
- `getitem(arr, [stop])`
- `getitem(arr, [start, stop])`
- `getitem(arr, [start, stop, step])`

```js
getitem([1, 2, 3, 4, 5], [2,,]) // [3, 4, 5]
getitem([1, 2, 3, 4, 5], [3,,-1]) // [4, 3, 2, 1]
```

python sub `arr[2]` is `list.__getitem__(arr, 2)`,other than `list.__getitem__(arr, slice(2))`.

javascript `[2,,]` is different than `[2,]` or you can just use `[2, null]`.



### setitem

- `setitem(arr, index, newItem)`
- `setitem(arr, [stop], newArr)`
- `setitem(arr, [start, stop], newArr)`
- `setitem(arr, [start, stop, step], newArr)`

```js
const arr = [1, 3, 4, 5]
setitem(arr, [], [7, 8, 9])
console.log(arr) // [7, 8, 9]
setitem(arr, [2,,], [7, 8, 9])
console.log(arr) // [7, 8, 7, 8, 9]
```

This is useful for changing vue Reactive list

```vue
<script setup>
import { reactive } from "vue"
const dataList = reactive([])
fetch('/dataList')
  .then(res => res.json())
  .then(data => setitem(dataList, [], data))
</script>

<template>
<ul>
  <li v-for="item in dataList" :key="item.id">{{ item.name }}</li>
</ul>
</template>
```


## Test

Coverage 97%

```shell
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   97.53 |    97.14 |     100 |   97.26 |
 index.ts |   97.53 |    97.14 |     100 |   97.26 | 25,63
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       29 passed, 29 total
```