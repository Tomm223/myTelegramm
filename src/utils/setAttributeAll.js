export function setAttributeAll(node, obj) {
   Object.keys(obj).forEach((key) => {
      node.setAttribute(key, obj[key])
   })
}