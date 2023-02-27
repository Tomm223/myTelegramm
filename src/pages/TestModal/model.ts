import { EventBus } from '@/core/EventBus'

let Initialstate = {
  df: 4,
  fdfd: 'sdsds',
}

export default class Store extends EventBus {
  static EVENT_UPDATE = '1'

  static _instance

  static STORE_NAME = 'myAppStore'

  _state = Initialstate

  constructor() {
    if (Store._instance) return Store._instance

    super()

    const savedState = localStorage.getItem(Store.STORE_NAME)

    this._state = savedState ? JSON.parse(savedState) ?? {} : {}

    Store._instance = this

    this.on(Store.EVENT_UPDATE, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state))
    })
  }

  getState() {
    return this._state
  }

  removeState() {
    this._state = {}
    this.emit(Store.EVENT_UPDATE)
  }

  set(id: string, value: any) {
    this._state[id] = value
    this.emit(Store.EVENT_UPDATE)
    return this
  }
}
