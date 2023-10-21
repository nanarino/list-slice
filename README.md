# list-slice

> inspired by Python list method : `list.__getitem__` and `list.__setitem__`


## Install

```
$ pnpm install list-slice
```

## Usage

```js
import { getitem, setitem, pop } from "list-slice"
```

### getitem

- `getitem(arr, index)`
- `getitem(arr, [stop])`
- `getitem(arr, [start, stop])`
- `getitem(arr, [start, stop, step])`
- `getitem(arr, { start, stop, step })`

```js
const arr = [1, 2, 3, 4, 5]
// python arr[2:]
getitem(arr, [2,,]) // [3, 4, 5]
// python arr[3::-1]
getitem(arr, [3,,-1]) // [4, 3, 2, 1]
```
`[2,,]` is different than `[2,]` or you can just use `[2, null]`.


### setitem

- `setitem(arr, index, newItem)`
- `setitem(arr, [stop], newArr)`
- `setitem(arr, [start, stop], newArr)`
- `setitem(arr, [start, stop, step], newArr)`
- `setitem(arr, { start, stop, step }, newArr)`

```js
const arr = [1, 3, 4, 5]

// python arr[:] = [7, 8, 9]
setitem(arr, [], [7, 8, 9])
console.log(arr) // [7, 8, 9]

// python arr[2:] = [7, 8, 9]
setitem(arr, [2,,], [7, 8, 9])
console.log(arr) // [7, 8, 7, 8, 9]
```


### pop

- `pop(arr)`
- `pop(arr, index)`


## Handling Errors

python-like error name:

```js
const a = getitem([1,2,3], 3)
          ^

SliceIndexError [RangeError]: list index out of range
    at file:///c:/Users/Administrator/Desktop/test.mjs:3:11
    at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
    at async Loader.import (internal/modules/esm/loader.js:178:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
    at async handleMainPromise (internal/modules/run_main.js:59:12)
```



## Bundler notes

It was exported with `cjs`,`esm`,`iife` format and named exports.

No export is transpiled for sake of modern syntax.

It can only run on node14+ and modern browsers.



## Test

Coverage 100%

```shell
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|-------------------
All files   |     100 |      100 |     100 |     100 | 
 error.ts   |     100 |      100 |     100 |     100 | 
 getitem.ts |     100 |      100 |     100 |     100 | 
 index.ts   |     100 |      100 |     100 |     100 | 
 pop.ts     |     100 |      100 |     100 |     100 | 
 setitem.ts |     100 |      100 |     100 |     100 | 
 slice.ts   |     100 |      100 |     100 |     100 | 
------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       46 passed, 46 total
```