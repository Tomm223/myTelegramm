import { TestHelper } from './../utils/testHelpers'
import Router from './router'

describe('Router: redirect', () => {
  TestHelper.implementingRouter()

  test('start from sing-in', async () => {
    await Router.start()

    const path = window.location.pathname

    expect(path).toBe('/sing-in')
  })

  test('redirect to sing-in', async () => {
    await Router.go('/messenger')
    const path = window.location.pathname

    expect(path).toBe('/sing-in')
  })
})

describe('Router: base methods', () => {
  TestHelper.implementingRouter()

  test('go', async () => {
    await Router.start()

    await Router.go('/sing-up')
    const path = window.location.pathname

    expect(path).toBe('/sing-up')
  })

  test('back', async () => {
    await Router.go('sing-in')

    Router.back()

    const path = window.location.pathname

    expect(path).toBe('/sing-in')
  })
  test('forward', () => {
    Router.forward()

    const path = window.location.pathname
    expect(path).toBe('/sing-in')
  })
})
