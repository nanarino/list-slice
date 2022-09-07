const { max, min } = Math

class slice {
  start: number | null
  stop: number | null
  step: number | null
  constructor(...args: (number | null | undefined)[]) {
    if (args.length === 1) {
      this.start = null
      this.stop = args[0] ?? null
      this.step = null
    } else {
      this.start = args[0] ?? null
      this.stop = args[1] ?? null
      if (args[2] === 0) {
        throw new RangeError(`slice step cannot be zero`)
      }
      this.step = args[2] ?? null
    }
  }
}

export function getitem<T>(arr: T[], indices: ConstructorParameters<typeof slice> | number): T | T[] {
  if (!Array.isArray(arr)) {
    throw new TypeError(`the 'getitem' only apply to 'list' object`)
  }
  if (Array.isArray(indices)) {
    const __s = new slice(...indices)
    __s.step ||= 1
    let isReverse = (__s.step < 0)
    if (__s.start === null) {
      __s.start = (isReverse ? (arr.length - 1) : 0)
    } else {
      if (__s.start < 0) __s.start += arr.length
      __s.start = max(0, min(__s.start, arr.length - 1))
    }
    if (__s.stop === null) {
      __s.stop = (isReverse ? 0 : arr.length)
    } else {
      if (__s.stop < 0) __s.stop += arr.length
      __s.stop = max(0, min(isReverse ? (__s.stop + 1) : __s.stop, arr.length))
    }
    const items: T[] = []
    for (let index = __s.start; isReverse !== index < __s.stop; index += __s.step) {
      items.push(arr[index])
    }
    return items
  } else {
    if (!Number.isInteger(indices)) {
      throw new TypeError(`list indices must be integers or slices`)
    }
    let __i = indices
    if (__i < 0) __i += arr.length
    if (__i < 0 || __i >= arr.length) {
      throw new RangeError(`list index out of range`)
    }
    return arr[__i]
  }
}

export function setitem<T>(arr: T[], indices: ConstructorParameters<typeof slice> | number, value: T | T[]): void {
  if (!Array.isArray(arr)) {
    throw new TypeError(`the 'setitem' only apply to 'list' object`)
  }
  if (Array.isArray(indices)) {
    const __s = new slice(...indices)
    __s.step ||= 1
    let isReverse = (__s.step < 0)
    if (__s.start === null) {
      __s.start = (isReverse ? (arr.length - 1) : 0)
    } else {
      if (__s.start < 0) __s.start += arr.length
      __s.start = max(0, min(__s.start, arr.length - 1))
    }
    if (__s.stop === null) {
      __s.stop = (isReverse ? 0 : arr.length)
    } else {
      if (__s.stop < 0) __s.stop += arr.length
      __s.stop = max(0, min(isReverse ? (__s.stop + 1) : __s.stop, arr.length))
    }
    const __i: number[] = []
    for (let index = __s.start; isReverse !== index < __s.stop; index += __s.step) {
      __i.push(index)
    }
    let newItems: T[]
    if (__s.step !== 1) {
      if (Array.isArray(value)) {
        newItems = value
      } else {
        throw new TypeError(`must assign list to extended slice`)
      }
      if (newItems.length !== __i.length) {
        throw new RangeError(`attempt to assign sequence of size ${newItems.length} to extended slice of size ${__i.length}`)
      }
      for (const [i, v] of Object.entries(newItems)) {
        arr[__i[i]] = v
      }
    } else {
      if (Array.isArray(value)) {
        newItems = value
      } else {
        throw new TypeError(`can only assign a list`)
      }
      arr.splice(__s.start, __i.length, ...newItems)
    }
  } else {
    if (!Number.isInteger(indices)) {
      throw new TypeError(`list indices must be integers or slices`)
    }
    let __i = indices
    if (__i < 0) __i += arr.length
    if (__i < 0 || __i >= arr.length) {
      throw new RangeError(`list index out of range`)
    }
    arr[__i] = value as T
  }
}