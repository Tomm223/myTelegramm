export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

interface OptionsType {
  data?: any
  countRequest?: number
  timeout?: number
}

type HTTPMethod = (url: string, options?: OptionsType) => Promise<any>

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
export function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

export class HTTPTransport {
  private _url: string

  constructor(url: string) {
    this._url = url
  }

  test = (url: string, options: OptionsType) => {
    return this.request(this._url + url, { ...options, method: METHODS.GET }, options?.timeout)
  }

  get: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.GET }, options?.timeout)
  }

  post: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.POST }, options?.timeout)
  }

  put: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.PUT }, options?.timeout)
  }

  delete: HTTPMethod = (url, options) => {
    return this.request(this._url + url, { ...options, method: METHODS.DELETE }, options?.timeout)
  }

  request = (url: string, options: Record<string, any>, timeout = 5000) => {
    const { headers, method, data } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      if (typeof headers === 'object') {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key])
        })
      }
      //default headers
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.withCredentials = true

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        const body = JSON.stringify(data)
        xhr.send(body)
        // xhr.send(body)
      }
    })
  }
}
