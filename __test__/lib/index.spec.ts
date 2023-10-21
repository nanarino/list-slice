import { getitem, setitem, slice, pop } from "../../lib"

const arrPerhaps: unknown = '2345'
const intPerhaps: unknown = '1'

// getitem
test('get slice apply not array', () => {
  expect(() => getitem(arrPerhaps as number[], 0)).toThrow(`the 'getitem' for 'Array' objects doesn't apply to a 'string' object`)
})
test('get index ∉ int', () => {
  expect(() => getitem([1, 2, 3, 4, 5], NaN)).toThrow('array indices must be integers or slices, not NaN')
})
test('get index ∉ number', () => {
  expect(() => getitem([1, 2, 3, 4, 5], intPerhaps as number)).toThrow('array indices must be integers or slices, not string')
})
test('get index 2', () => {
  expect(getitem([1, 2, 3, 4, 5], 2)).toBe(3)
})
test('get index -2', () => {
  expect(getitem([1, 2, 3, 4, 5], -2)).toBe(4)
})
test('get index ∉ range', () => {
  expect(() => getitem([1, 2, 3, 4, 5], 500)).toThrow('array index out of range')
})
test('get slice [::]', () => {
  expect(getitem([1, 2, 3, 4, 5], [null])).toEqual([1, 2, 3, 4, 5])
})
test('get slice [slice()]', () => {
  expect(getitem([1, 2, 3, 4, 5], {})).toEqual([1, 2, 3, 4, 5])
})
test('get slice [::-1]', () => {
  expect(getitem([1, 2, 3, 4, 5], [, , -1])).toEqual([5, 4, 3, 2, 1])
})
test('get slice [4]', () => {
  expect(getitem([1, 2, 3, 4, 5], [4])).toEqual([1, 2, 3, 4])
})
test('get slice [4:]', () => {
  expect(getitem([1, 2, 3, 4, 5], [4, ,])).toEqual([5])
})
test('get slice [2:4]', () => {
  expect(getitem([1, 2, 3, 4, 5], [2, -1])).toEqual([3, 4])
})
test('get slice [2:-1]', () => {
  expect(getitem([1, 2, 3, 4, 5], [2, -1])).toEqual([3, 4])
})
test('get slice [:3:-1]', () => {
  expect(getitem([1, 2, 3, 4, 5], [, 3, -1])).toEqual([5])
})
test('get slice [-500:-1]', () => {
  expect(getitem([1, 2, 3, 4, 5], [-500, -1])).toEqual([1, 2, 3, 4])
})
test('get slice [slice(-500,-1)]', () => {
  expect(getitem([1, 2, 3, 4, 5], { start: -500, stop: -1 })).toEqual([1, 2, 3, 4])
})
test('get slice [0:500]', () => {
  expect(getitem([1, 2, 3, 4, 5], [0, 500])).toEqual([1, 2, 3, 4, 5])
})
test('get slice [-1:1:-1]', () => {
  expect(getitem([1, 2, 3, 4, 5], [-1, 1, -1])).toEqual([5, 4, 3])
})
test('get slice [-1:1:0]', () => {
  expect(() => getitem([1, 2, 3, 4, 5], [-1, 1, 0])).toThrow('slice step cannot be zero')
})


// setitem
test('set slice apply not array', () => {
  expect(() => setitem(arrPerhaps as number[], 0, 1)).toThrow(`the 'setitem' requires a 'Array' object but received a 'string'`)
})
const arr = [2, 3, 4, 5]
const setItemAndBack = (slice: number | (number | undefined)[] | slice, newSlice: number | number[]) => {
  setitem(arr, slice, newSlice)
  return arr
}
test('set index ∉ int', () => {
  expect(() => setItemAndBack(NaN, 1)).toThrow('array indices must be integers or slices, not NaN')
})
test('set index ∉ number', () => {
  expect(() => setItemAndBack(intPerhaps as number, 1)).toThrow('array indices must be integers or slices, not string')
})
test('set index 0 = 1', () => {
  expect(setItemAndBack(0, 1)).toEqual([1, 3, 4, 5])
})
test('set index < range', () => {
  expect(() => setItemAndBack(-500, 1)).toThrow('array index out of range')
})
test('set index > range', () => {
  expect(() => setItemAndBack(500, 1)).toThrow('array index out of range')
})
test('set slice [:] = [...]', () => {
  expect(setItemAndBack([], [7, 8, 9])).toEqual([7, 8, 9])
})
test('set slice [2:] = [...]', () => {
  expect(setItemAndBack([2, ,], [7, 8, 9])).toEqual([7, 8, 7, 8, 9])
})
test('set slice [::-1] = []', () => {
  expect(() => setItemAndBack([, , -1], [])).toThrow('attempt to assign sequence of size 0 to extended slice of size 5')
})
test('set slice [:-1] = [...]', () => {
  expect(setItemAndBack([, -1], [1])).toEqual([1, 9])
})
test('set slice [-1:-1] = [...]', () => {
  expect(setItemAndBack([-1, -1], [1, 2, 3])).toEqual([1, 1, 2, 3, 9])
})
test('set slice [:] = val', () => {
  expect(() => setItemAndBack([], 999)).toThrow('can only assign an array')
})
test('set slice [::-1] = val', () => {
  expect(() => setItemAndBack([, , -1], 999)).toThrow('must assign Array to extended slice')
})
test('set slice [-500:500] = [...]', () => {
  expect(setItemAndBack([-500, 500], [0, 1, 2])).toEqual([0, 1, 2])
})
test('set slice [::-1] = [...]', () => {
  expect(setItemAndBack([, , -1], [0, 1, 2])).toEqual([2, 1, 0])
})
test('set slice [-1:-2:-1] = [...]', () => {
  expect(setItemAndBack([-1, -2, -1], [2])).toEqual([2, 1, 2])
})
test('set slice [slice()] = [...]', () => {
  expect(setItemAndBack({ start: null, stop: null, step: null }, [2])).toEqual([2])
})

// pop
test('pop default index', () => {
  expect(pop([1, 2, 3])).toEqual(3)
})
test('pop apply not array', () => {
  expect(() => pop(arrPerhaps as number[])).toThrow(`the 'pop' for 'Array' objects doesn't apply to a 'string' object`)
})
test('pop apply empty array', () => {
  expect(() => pop([])).toThrow(`pop from empty array`)
})
test('pop index ∉ int', () => {
  expect(() => pop([1, 2, 3], NaN)).toThrow(`NaN cannot be interpreted as an integer`)
})
test('pop index ∉ number', () => {
  expect(() => pop([1, 2, 3], intPerhaps as number)).toThrow(`'string' object cannot be interpreted as an integer`)
})
test('pop index >= length', () => {
  expect(() => pop([1, 2, 3], 3)).toThrow(`pop index out of array`)
})
test('pop index ∈ (0, length)', () => {
  expect(pop([1, 2, 3], 2)).toEqual(3)
})
test('pop index < -length', () => {
  expect(() => pop([1, 2, 3], -4)).toThrow(`pop index out of array`)
})
test('pop index ∈ [-length, 0)', () => {
  expect(pop([1, 2, 3], -3)).toEqual(1)
})
test('pop index = 0', () => {
  expect(pop([1, 2, 3], 0)).toEqual(1)
})
test('pop index = null', () => {
  expect(pop([1, 2, 3], null as unknown as undefined)).toEqual(3)
})
