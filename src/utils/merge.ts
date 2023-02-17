type Indexed<T = unknown> = {
  [key in string]: T
}

export function merge(obj1: Indexed, obj2: Indexed): Indexed {
  for (var p in obj2) {
    try {
      if (typeof obj2[p] === 'object' && typeof obj1[p] === 'object') {
        let child1 = obj1[p] as Indexed
        let child2 = obj2[p] as Indexed
        obj1[p] = merge(child1, child2)
      } else {
        obj1[p] = obj2[p]
      }
    } catch (e) {
      obj1[p] = obj2[p]
    }
  }
  return obj1
}
