import Store from './Store'

type Indexed = Record<string, any>
export function connect(Block: any, mapStateToProps: (state: Indexed) => Indexed): any {
  class ConnectComp extends Block {
    constructor(props = {}) {
      // super({ ...props, ...mapStateToProps(store.getState()) })
      // // подписываемся на событие
      // store.off(StoreEvents.Updated, () => {
      //    // вызываем обновление компонента, передав данные из хранилища
      //    this.setProps({ ...mapStateToProps({store.getState() })
      //  }))
      const store = new Store()

      super({ ...props, ...mapStateToProps(store.getState()) })

      store.on(Store.EVENT_UPDATE, () => {
        this.setProps({ ...mapStateToProps(store.getState()) })
      })

      // this.subscribe()
    }

    //  subscribe(){
    //    let subFunc = () => {
    //       // вызываем обновление компонента, передав данные из хранилища
    //       this.setProps({ ...mapStateToProps({store.getState() })
    //     })
    //    store.on(StoreEvents.Updated, subFunc)
    //  }
    //  unSubscribe(){
    //    let subFunc = () => {
    //       // вызываем обновление компонента, передав данные из хранилища
    //       this.setProps({ ...mapStateToProps({store.getState() })
    //     })
    //    store.off(StoreEvents.Updated, subFunc)
    //  }

    //  show() {
    //    let html = this.getContent()
    //    if (!html) return
    //    html.style.display = 'block'
    //    // this.subscribe()

    //  }

    //  hide() {
    //    let html = this.getContent()
    //    if (!html) return
    //    html.style.display = 'none'
    //    // this.unSubscribe()
    //  }
  }

  return ConnectComp // as ComponentInst
}

// }
// export default function connect(
//   Component: any,
//   mapStateToProps: (state: Indexed) => Indexed
// ): ComponentInst {
//   // используем class expression
//   return class extends Component {
//     constructor(props) {
//       const store = new Store()

//       super({ ...props, ...mapStateToProps(store.getState()) })

//       store.on(Store.EVENT_UPDATE, () => {
//         this.setProps({ ...mapStateToProps(store.getState()) })
//         console.log(this)
//       })

//       // this.subscribe()
//     }

//     //  subscribe(){
//     //    let subFunc = () => {
//     //       // вызываем обновление компонента, передав данные из хранилища
//     //       this.setProps({ ...mapStateToProps({store.getState() })
//     //     })
//     //    store.on(StoreEvents.Updated, subFunc)
//     //  }
//     //  unSubscribe(){
//     //    let subFunc = () => {
//     //       // вызываем обновление компонента, передав данные из хранилища
//     //       this.setProps({ ...mapStateToProps({store.getState() })
//     //     })
//     //    store.off(StoreEvents.Updated, subFunc)
//     //  }

//     //  show() {
//     //    let html = this.getContent()
//     //    if (!html) return
//     //    html.style.display = 'block'
//     //    // this.subscribe()

//     //  }

//     //  hide() {
//     //    let html = this.getContent()
//     //    if (!html) return
//     //    html.style.display = 'none'
//     //    // this.unSubscribe()
//     //  }
//   }
// }

// function mapUserToProps(state) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   }
// }

// export connect(UserProfile);

// // AccountPage.ts
// const userProfile = new UserProfile();

//Cпециальные Хоки типо только под данные user или чата
// function connect(mapStateToProps: (state: Indexed) => Indexed) {
//    return function(Component: typeof Block) {
//      return class extends Component {
//        ...
//      }
//      }
//  }

//  const withUser = connect(state => ({ user: state.user }));

//  withUser(UserProfile);
//  withUser(SettingsPage);
