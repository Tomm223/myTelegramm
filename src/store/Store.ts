import { Message } from './../types/chats'
import { ChatList } from 'src/types/chats'
import { EventBus } from '@/core/EventBus'
import { UserType } from '@/types/user'

export interface InitialStateType {
  listChats: {
    limit: number
    offset: number
    search: string
    list: ChatList[] | []
    loading: boolean
  }
  chat: {
    messages: Message[] | []
    page: number
    loading: boolean
  }
  sing_in: {
    loading: boolean
    error: string
  }
  sing_up: {
    loading: boolean
    error: string
  }
  user: UserType | null
  isAuth: boolean
}

const Initialstate: InitialStateType = {
  listChats: {
    limit: 10,
    offset: 10,
    search: '',
    list: [],
    loading: false,
  },
  chat: {
    messages: [],
    page: 1,
    loading: false,
  },
  sing_in: {
    loading: false,
    error: '',
  },
  sing_up: {
    loading: false,
    error: '',
  },
  user: null,
  isAuth: false,
}

export default class Store extends EventBus {
  static EVENT_UPDATE = '1'

  static _instance

  static STORE_NAME = 'myAppStore'

  private _state: InitialStateType

  constructor() {
    if (Store._instance) return Store._instance

    super()

    // localStorage.removeItem(Store.STORE_NAME)
    const savedState = localStorage.getItem(Store.STORE_NAME)

    this._state = savedState ? JSON.parse(savedState) ?? Initialstate : Initialstate
    // this._state = Initialstate

    Store._instance = this

    this.on(Store.EVENT_UPDATE, () => {
      const saveState: InitialStateType = {
        ...Initialstate,
        isAuth: this._state.isAuth,
        user: this._state.user,
        chat: this._state.chat,
      }

      localStorage.setItem(Store.STORE_NAME, JSON.stringify(saveState))
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

// export default new Store()

// export enum StoreEvents {
//   Updated = 'updated',
// }

// // наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
// class Store extends EventBus {
//   private state: Indexed = {}

//   public getState() {
//     return state
//   }

//   public set(path: string, value: unknown) {
//     set(this.state, path, value)

//     // метод EventBus
//     this.emit(StoreEvents.Updated)
//   }
// }

// export default new Store()

// import { EventBus } from '@/core/EventBus';
// //пример

// import store, { StoreEvents } from './Store'

// class UserProfile extends Block {
//   constructor(...args) {
//     super(...args)

//     // запрашиваем данные у контроллера
//     UserController.getUser()

//     // подписываемся на событие
//     store.on(StoreEvents.Updated, () => {
//       // вызываем обновление компонента, передав данные из хранилища
//       this.setProps(store.getState())
//     })
//   }

//   render() {
//     // внутри рендер в this.props будут достпны данные из хранилища
//   }
// }

// class UserController {
//    public getUser() {
//      UserAPI.getUser()
//               .then(data => store.set('user', data);
//    }
//  }

// Конченый резик
// function connect(mapStateToProps: (state: Indexed) => Indexed) {
//    return function(Component: typeof Block) {
//      return class extends Component {
//        constructor(props) {
//                  // сохраняем начальное состояние
//                  let state = mapStateToProps(store.getState());

//            super({...props, ...state});

//            // подписываемся на событие
//              store.on(StoreEvents.Updated, () => {
//                      // при обновлении получаем новое состояние
//                      const newState = mapStateToProps(store.getState());

//                      // если что-то из используемых данных поменялось, обновляем компонент
//                      if (!isEqual(state, newState)) {
//                    this.setProps({...newState});
//                      }

//                      // не забываем сохранить новое состояние
//                      state = newState;
//                  });
//          }
//      }
//      }
//  }
