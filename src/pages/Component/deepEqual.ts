

export function deepEqual(obj1: any, obj2: any): boolean {

   if (obj1 === obj2) {   //Same object reference
      return true;
   }

   if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
   }  // If length is not same objects are not


   for (var i in obj1) {
      if ((obj1[i] !== null && typeof obj1[i] === 'object') &&
         (obj2[i] !== null && typeof obj2[i] === 'object')) {

         return deepEqual(obj1[i], obj2[i]);
      }

      else if (((typeof obj1[i]) != 'object') &&
         ((typeof obj1[i]) != 'object')) {
         if (obj1[i] === obj2[i]) {
            return true; // These are identical values!
         }
      }

      else if (obj1[i] == null && obj2[i] == null) { return true; }

      else return false; //If they are not equal 
   }
   return false
} 