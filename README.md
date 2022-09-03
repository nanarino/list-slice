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

`getitem(arr, [start, stop, step])`

```js
getitem([1, 2, 3, 4, 5], [2, null]) // [3, 4, 5]
getitem([1, 2, 3, 4, 5], [3, null, -1]) // [4, 3, 2, 1]
```

### setitem

`setitem(arr, [start, stop, step], newArr)`

```js
const arr = [1, 3, 4, 5]
setitem(arr, [], [7, 8, 9])
console.log(arr) // [7, 8, 9]
setitem(arr, [2, null], [7, 8, 9])
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

Cover 100%

```shell
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.ts |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```