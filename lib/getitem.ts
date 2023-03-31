import { SliceRangeError, SliceIndexError, SliceTypeError } from './error'
import type { slice as _slice } from './types'
import typeOf from 'just-typeof'
import { slice } from './slice'

const { max, min } = Math


function _getitem<T>(arr: T[], indices: ConstructorParameters<typeof slice> | Partial<_slice> | number): T | T[] {
  if (!Array.isArray(arr)) {
    // TypeError: descriptor '__getitem__' for 'list' objects doesn't apply to a '{*}' object
    throw new SliceTypeError(`the 'getitem' for 'Array' objects doesn't apply to a '${typeOf(arr)}' object`)
  }
  if (typeof indices === "object") {
    const __s = Array.isArray(indices) ? new slice(...indices) : slice.from(indices)
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
      const indicesType = typeOf(indices)
      // TypeError: list indices must be integers or slices, not {*}
      throw new SliceTypeError(`list indices must be integers or slices, not ${(indicesType === 'number') ? indices : indicesType}`)
    }
    let __i = indices
    if (__i < 0) __i += arr.length
    if (__i < 0 || __i >= arr.length) {
      // IndexError: list index out of range
      throw new SliceIndexError(`list index out of range`)
    }
    return arr[__i]
  }
}

export const getitem: (typeof _getitem) = (...args) => {
  try {
    return _getitem(...args)
  } catch (error) {
    if (Error.captureStackTrace) {
      if ((error instanceof SliceRangeError) || (error instanceof SliceTypeError)) {
        Error.captureStackTrace(error, getitem)
      }
    }
    throw error
  }
}
