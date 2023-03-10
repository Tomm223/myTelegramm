import { HTTPTransport } from './fetch'

describe('HTTPTransport', () => {
  const http = new HTTPTransport('https://jsonplaceholder.typicode.com')
  const mockRes = { tree: { a: null, b: null } }
  test('mocking', async () => {
    http.mockResolve(mockRes)

    let responseMockGet = await http.get('/post')
    responseMockGet = await JSON.parse(responseMockGet.response)
    let responseMockPost = await http.post('/post')
    responseMockPost = await JSON.parse(responseMockPost.response)
    let responseMockPut = await http.put('/post')
    responseMockPut = await JSON.parse(responseMockPut.response)
    let responseMockDel = await http.delete('/post')
    responseMockDel = await JSON.parse(responseMockDel.response)

    expect(responseMockGet).toEqual(mockRes)
    expect(responseMockPost).toEqual(mockRes)
    expect(responseMockPut).toEqual(mockRes)
    expect(responseMockDel).toEqual(mockRes)

    http.mockResolveEnd()

    const resMock = http._getmockResolve()

    expect(resMock).toBe(null)
  })

  test('request: get options create url query', async () => {
    const respCheck = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ]

    let responseGet = await http.get('/posts', { data: { id: 1 } })
    responseGet = JSON.parse(responseGet.response)

    expect(responseGet).toEqual(respCheck)
  })
})
