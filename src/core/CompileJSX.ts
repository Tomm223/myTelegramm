const CompileMaster = {
  createElement: function (tag: string, attrs: any) {
    const node = document.createElement(tag)

    for (const key in attrs) {
      if (!key && !attrs.hasOwnProperty(key)) break

      const value = attrs[key]

      if (value === true) {
        node.setAttribute(key, key)
      } else if (value !== false && value != null) {
        node.setAttribute(key, value.toString())
      }
    }

    for (const i = 2; i < arguments.length; i++) {
      const childNode =
        arguments[i].nodeType == null
          ? document.createTextNode(arguments[i].toString())
          : arguments[i]

      node.appendChild(childNode)
    }

    return node
  },
}

export default CompileMaster
