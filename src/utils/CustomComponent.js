export default class CustomComponent extends HTMLElement {
   constructor() {
      super();
   }
   setAttributeAll(obj) {
      Object.keys(obj).forEach((key) => {
         this.setAttribute(key, obj[key])
      })
   }
}