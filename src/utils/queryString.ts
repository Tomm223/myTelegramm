type StringIndexed = Record<string, any>

function recurs(obj: StringIndexed): string {
  //[b][d]=2
  let result = []
  for (const key in obj) {
    const element = obj[key] //[d]=2
    if (typeof element === 'object' && element !== null) {
      let res = recurs(element)
      result.push(`[${key}]${res}`)
    } else {
      result.push(`[${key}]=${element}`)
    }
  }
  return result.join()
}

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object')
  }
  let result = []

  for (const key in data) {
    let element = data[key]
    if (typeof element !== 'object' && element !== null) {
      result.push(`${key}=${element}`)
    } else {
      element = recurs(element)
      result.push(`${key}${element}`)
    }
  }

  return result.join('&')
}
