import Component from '@/core/Component'
import { renderDOM } from '@/core/renderDOM'
import Actions from '@/store/Actions'
import Store from '@/store/Store'
import { isEqual } from '@/utils/isEqual'

class Route {
  _pathname: string

  _blockClass: any

  _block: null | any

  _props: Record<string, any>

  constructor(pathname: string, view: Component, props: Record<string, any>) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render({})
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render(props: Record<string, any>) {
    if (!this._block) {
      this._block = new this._blockClass(props)
      if (!this._block) return
      renderDOM(this._props.rootQuery, this._block)
      return
    }

    this._block.show()
  }
}

class RouterInst {
  __instance: any

  routes: Route[]

  history: History

  _currentRoute: null | Route

  _rootQuery: string

  constructor(rootQuery: string) {
    if (RouterInst.__instance) {
      return RouterInst.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    RouterInst.__instance = this
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })

    this.routes.push(route)

    return this
  }

  start() {
    window.onpopstate = ((event: any) => {
      this._onRoute(event.currentTarget.location.pathname)
    }).bind(this)

    this._onRoute(window.location.pathname)
  }

  // _makeProxyOnRoute(fn: any) {
  //   if (typeof fn !== 'function') throw new Error(`Rout dont can make proxy for ${fn} `)

  // }

  isValidUser() {
    const isAuth = Actions.getIsAuth()
    return isAuth
  }

  isRedirected(pathname: string): boolean {
    const isValidUser = this.isValidUser()
    let isRedirect = false
    if (isValidUser) {
      if (pathname !== '/messenger' && pathname !== '/setting') {
        // return '/messenger'
        this.go('/messenger')
        isRedirect = true
      }
    } else {
      if (pathname !== '/sing-in' && pathname !== '/sing-up') {
        // return '/sing-in'
        this.go('/sing-in')
        isRedirect = true
      }
    }
    return isRedirect
  }

  _onRoute(pathname: string, props: Record<string, any> = {}) {
    let route: Route
    const routeOfPath = this.getRoute(pathname)

    if (routeOfPath) {
      const isRedirected = this.isRedirected(pathname)

      if (isRedirected) {
        return
      }

      route = routeOfPath
    } else {
      route = this.getRoute('/no-found') || this.getRoute('/error')
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render(props)
  }

  go(pathname: string, props?: Record<string, any>) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname, props)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

const Router = new RouterInst('#root')
export default Router
