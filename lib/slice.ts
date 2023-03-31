import { SliceInitError } from './error'
import type { slice as _slice } from './types'


export class slice implements _slice {
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
        // ValueError: slice step cannot be zero
        throw new SliceInitError(`slice step cannot be zero`)
      }
      this.step = args[2] ?? null
    }
  }
  static from(o: Partial<_slice>) {
    return new slice(o.start, o.stop, o.step)
  }
}
