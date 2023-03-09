import { SingController } from '@/service/sing.service'
import Router from './router'
import Nagivation from '@/pages/Navigation'
import Actions from '@/store/Actions'

const controller = new SingController()

const checkIsAuth = async () => {
  const isAuthUser = Actions.getIsAuth()
  if (isAuthUser) {
    await controller.logout()
  }
}

describe('Router: redirect', () => {
  // beforeAll(checkIsAuth)

  document.body.innerHTML = '<div id="root"></div>'

  Router.use('/', Nagivation)
    .use('/messenger', Nagivation)
    .use('/setting', Nagivation)
    .use('/sing-in', Nagivation)
    .use('/sing-up', Nagivation)
    .use('/no-found', Nagivation)
    .use('/server-error', Nagivation)

  test('start from sing-in', async () => {
    await checkIsAuth()
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
  // beforeAll(checkIsAuth)

  test('go', async () => {
    await checkIsAuth()

    await Router.start()

    await Router.go('/sing-up')
    const path = window.location.pathname

    expect(path).toBe('/sing-up')
  })

  // test('back', async () => {
  //   await Router.go('sing-in')
  //   await Router.go('sing-up')

  //   Router.back()

  //   const path = window.location.pathname

  //   expect(path).toBe('/sing-in---')
  // })
  // test('forward', () => {
  //   Router.forward()

  //   const path = window.location.pathname
  //   expect(path).toBe('/sing-up')
  // })
})
