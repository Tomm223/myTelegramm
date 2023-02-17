import ErrorPage from '../pages/ErrorPage'
import Messanger from '../pages/Messenger'
import Nagivation from '../pages/Navigation'
import ProfilePage from '../pages/ProfilePage'
import SingInPage from '../pages/SingInPage'
import SingUpPage from '../pages/SingUpPage'
import Component from '../core/Component'
import { renderDOM } from '@/core/renderDOM'

const Routes = {
  messager: '/',
  singin: '/singin',
  singup: '/singin',
  profile: '/profile',
}

interface Routes {
  pathname: string
  query: string
}

export default function Router({ pathname, query }: Routes): void {
  const pages: Record<string, Component> = new Proxy(
    {
      'sing-in': new SingInPage({}),
      'sing-up': new SingUpPage({}),
      messanger: new Messanger({}),
      profile: new ProfilePage({}),
      'no-found': new ErrorPage({ numberError: 404, type: '400' }),
      error: new ErrorPage({ numberError: 500, type: '500' }),
      navigate: new Nagivation({}),
    },
    {
      get(target: any, prop: string) {
        try {
          const value = target[prop]
          if (!prop) {
            return target['navigate']
          }
          if (!value) {
            return target['no-found']
          }
          return value
        } catch (e) {
          return target['eror']
        }
      },
      set(target, prop: string, value) {
        throw new Error('Нет доступа')
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    }
  )

  const [path] = pathname.split('/').slice(1) as string[]

  renderDOM('#root', pages[path])
}
