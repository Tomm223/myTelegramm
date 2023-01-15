export function first(list) {
   if (!Array.isArray(list)) {
      throw new Error('err type')
   }
   if (!list.length) {
      return undefined
   }
   return list[0]
}

