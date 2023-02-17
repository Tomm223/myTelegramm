type Indexed = Record<string, any>

export function cloneDeep(obj: Indexed): Indexed {
  // Код здесь
  if (typeof obj == 'object') {
    if (Array.isArray(obj)) {
      return obj.map((condidate) => cloneDeep(condidate))
    } else {
      let result: Indexed = {}

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let child = obj[key] as Record<string, any>
          result[key] = cloneDeep(child)
        }
      }
      return result
    }
  } else {
    return obj
  }
}
