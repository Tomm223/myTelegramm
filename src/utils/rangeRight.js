function rangeRight(start, end, step) {
   const isNum = (num) => typeof num === 'number' ? true : false

   if (!isNum(start)) {
      return []
   }
   else if (!isNum(end) && !isNum(step)) {
      end = start
      start = 0
      step = end > 0 ? 1 : -1
   }
   else if (!isNum(step)) {
      step = end > 0 ? 1 : -1
   }

   let positive = start > 0 ? true : false

   const arr = []

   for (let i = end; positive ? i < start : i > start; i += step) {
      arr.push(i)
   }
   return arr
}