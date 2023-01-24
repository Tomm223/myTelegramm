export function isEmpty(arg) {

   const isTrue = typeof arg === 'number' || typeof arg === 'boolean' || typeof arg === 'undefined' ||
      arg === null || arg === '' ? true : false

   if (isTrue) {
      return true
   }
   if (Array.isArray(arg) && !arg.length) {
      console.log(arg)
      return true
   }
   if (arg instanceof Map || arg instanceof Set) {
      return false
   }
   else {
      const num = Object.keys(arg)
      console.log(num);
      if (!num.length) {
         return true
      }
   }

   return false
}


