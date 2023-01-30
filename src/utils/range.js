export function range(start, end, step, isRight) {
  const isNum = (num) => (typeof num === 'number' ? true : false)

  if (!isNum(start)) {
    return []
  } else if (!isNum(end) && !isNum(step)) {
    end = start
    start = 0
    step = end > 0 ? 1 : -1
  } else if (!isNum(step)) {
    step = end > 0 ? 1 : -1
  }

  let length = step > 1 || step > -1 ? Math.floor(end / step) : end - start
  length = length < 0 ? -length : length
  let array = Array.from({ length: length }, (elem, index) => 0)
  console.log(array, length)

  let count = start

  const isBreak = () => {
    if (end > 0) {
      count >= end ? true : false
    } else {
      count <= end ? true : false
    }
  }

  for (let i = 0; i < array.length || isBreak(); i++) {
    array[i] = count
    console.log('dfk')
    count += step
  }

  return isRight ? array.reverse() : array
}

export function rangeRight(start, end, step) {
  return range(start, end, step, true)
}
