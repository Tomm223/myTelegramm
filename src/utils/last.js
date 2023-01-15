export function last(list) {
   if (!Array.isArray(list)) {
      throw Error('not array')
   }
   if (!list.length) {
      return undefined
   }

   for (let i = 0; i < list.length; i++) {
      if (!list[i + 1]) {
         return list[i]
      }
   }
}

