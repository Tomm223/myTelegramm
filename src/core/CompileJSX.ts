const CompileMaster = {
   createElement: function (tag: string, attrs: any) {
      let node = document.createElement(tag);

      for (let key in attrs) {

         if (!key && !attrs.hasOwnProperty(key)) break

         let value = attrs[key];

         if (value === true) {
            node.setAttribute(key, key);
         }
         else if (value !== false && value != null) {
            node.setAttribute(key, value.toString());
         }
      }

      for (let i = 2; i < arguments.length; i++) {
         let childNode = arguments[i].nodeType == null ?
            document.createTextNode(arguments[i].toString()) :
            arguments[i]

         node.appendChild(childNode);
      }

      return node;
   }
};

export default CompileMaster

