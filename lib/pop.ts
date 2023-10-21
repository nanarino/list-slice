import { PopIndexError, PopTypeError } from './error'
import typeOf from 'just-typeof'

function _pop<T>(arr: T[], index: number | null = -1): T {
  if (!Array.isArray(arr)) {
    // TypeError: descriptor 'pop' for 'list' objects doesn't apply to a '{*}' object
    throw new PopTypeError(`the 'pop' for 'Array' objects doesn't apply to a '${typeOf(arr)}' object`)
  }
  const { length } = arr
  if (length) {
    index ??= length - 1
    if (!Number.isInteger(index)) {
      const indexType = typeOf(index)
      // TypeError: '{*}' object cannot be interpreted as an integer
      throw new PopTypeError(`${(indexType === 'number') ? index : `'${indexType}' object`} cannot be interpreted as an integer`)
    }
    if (index < 0) index += length
    if (index < length && index >= 0) {
      return arr.splice(index, 1)[0]
    } else {
      // IndexError: pop index out of range
      throw new PopIndexError(`pop index out of array`)
    }
  } else {
    // IndexError: pop from empty list
    throw new PopIndexError(`pop from empty array`)
  }
}

export const pop: (typeof _pop) = (...args) => {
  try {
    return _pop(...args)
  } catch (error) {
    if (Error.captureStackTrace) {
      if ((error instanceof PopTypeError) || (error instanceof PopIndexError)) {
        Error.captureStackTrace(error, pop)
      }
    }
    throw error
  }
}
