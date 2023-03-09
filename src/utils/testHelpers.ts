import Router from '@/app/router'
import Nagivation from '@/pages/Navigation'

class TestHelpers {
  implementingRouter() {
    document.body.innerHTML = '<div id="root"></div>'

    Router.use('/', Nagivation)
      .use('/messenger', Nagivation)
      .use('/setting', Nagivation)
      .use('/sing-in', Nagivation)
      .use('/sing-up', Nagivation)
      .use('/no-found', Nagivation)
      .use('/server-error', Nagivation)
  }

  async startRouter() {
    await Router.start()
  }
}

export const TestHelper = new TestHelpers()
