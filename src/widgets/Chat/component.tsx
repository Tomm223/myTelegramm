import CompileMaster from '@/core/CompileJSX'
import Header from './UI/Header'
import styles from './styles.module.scss'

import Plus from '@/static/icons/plus.svg'
import Krest from '@/static/icons/krest.svg'
import FormSend from './UI/FormSend'
import MessageScreen from './UI/MessageScreen'
import AddUser from '@/entities/modals/AddUser'
import RemoveUser from '@/entities/modals/RemoveUser'
import Component from '@/core/Component'
import MenuChat from './UI/MenuChat'
import ButtonMenu from './UI/MenuChat/ButtonMenu'
import { EventBus } from '@/core/EventBus'
import { ChatEventBus, CHATEVENTS } from './eventbus'
import { ChatWebSocketService } from '@/service/chat.ws.service'
import Actions from '@/store/Actions'
import { ChatsController } from '@/service/chats.service'
import Store from '@/store/Store'

interface ChatType {
  header?: Component
  addUser?: Component
  removeUser?: Component
  messageList?: Component
  formSend?: Component
  chat?: {
    avatar: string | null
    chatID: number | null
    token: string | null
    loading: boolean
  }
}

export default class Chat extends Component<ChatType> {
  WS: ChatWebSocketService | null = null

  constructor(props: ChatType) {
    props.header = new Header({
      menu: new MenuChat({
        ref: 'menu',
        buttons: [
          new ButtonMenu({
            img: Plus,
            text: 'Добавить пользователя',
            onClick: () => {
              ChatEventBus.emit(CHATEVENTS.ADDUSER)
            },
          }),
          new ButtonMenu({
            img: Krest,
            text: 'Удалить пользователя',
            onClick: () => {
              ChatEventBus.emit(CHATEVENTS.REMOVEUSER)
            },
          }),
        ],
      }),
    })
    props.messageList = new MessageScreen({})
    props.formSend = new FormSend({})
    super(props)
  }

  protected init(): void {
    const api = new ChatsController()

    this.children.addUser = new AddUser({
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: async (form) => {
        const userID = Number(form.add_name)
        const chatID = Actions.getChatID()
        if (typeof userID !== 'number' && typeof chatID !== 'number') {
          alert('нужна айдиха')
          return
        }
        if (typeof chatID !== 'number') return

        api.addUser({ chatID, userID })
      },
    })

    this.children.removeUser = new RemoveUser({
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: (form) => {
        const userID = Number(form.remove_name)
        const chatID = Actions.getChatID()
        if (typeof userID !== 'number') {
          alert('нужна айдиха')
          return
        }
        if (typeof chatID !== 'number') return

        api.removeUser({ chatID, userID })
      },
    })
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ChatEventBus.on(CHATEVENTS.ADDUSER, this.handleAddUser.bind(this))
    ChatEventBus.on(CHATEVENTS.REMOVEUSER, this.handleRemoveUser.bind(this))
  }

  handleAddUser() {
    let modal = this.children.addUser
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
  }

  handleRemoveUser() {
    let modal = this.children.removeUser
    if (Array.isArray(modal)) return

    if (modal.props.isOpen) {
      modal.setProps({ isOpen: false })
    } else {
      modal.setProps({ isOpen: true })
    }
  }

  handleWSMessages(e: MessageEvent<any>) {
    const store = new Store()

    console.log('handleMSG', e.data, store.getState().chat.token)

    const msg = JSON.parse(e.data)

    if (Array.isArray(msg)) {
      Actions.pushChatMessages(msg.reverse())
    } else {
      Actions.pushChatMessages([msg])
    }
  }

  handleOpen() {
    // console.log('open connect')

    this.WS?.getMessages(0)
  }

  // не ресетит нормально

  protected componentDidMount(): void {
    if (!this.props.chat) return
    const { loading, chatID, token } = this.props.chat
    const userID = Actions.getUser()?.id

    if (!chatID) return
    if (!userID) return
    if (!token) return

    this.WS = new ChatWebSocketService(
      {
        chatID,
        token,
        userID,
      },
      this.handleWSMessages,
      this.handleOpen.bind(this)
    )

    const form = this.children.formSend as Component
    form.props.onSubmit = this.WS.sendMessage.bind(this.WS)
  }

  resetChat() {
    this.WS?.closeWebsocket()
  }

  protected componentDidUpdate(oldProps: ChatType, newProps: ChatType): void {
    if (oldProps.chat && newProps.chat) {
      const { chatID, token } = oldProps.chat
      const { chatID: newId, token: newToken } = newProps.chat
      if (chatID !== newId && token !== newToken && this.WS) {
        // if change chat to reset
        this.resetChat()
        // and open new Connect
        if (newToken && newId) {
          const id = Actions.getUser()?.id
          if (newId && newToken && id) {
            this.WS?.reFetch({
              chatID: newId,
              token: newToken,
              userID: id,
            })
          }
        }
      }
    }
  }

  protected render(): HTMLElement {
    // console.log('render chat', this.props.chat)

    return (
      <div class={styles.container}>
        <div class={styles.block}>
          {this.childrenHTML.elements.header}
          {this.childrenHTML.elements.messageList}
          {this.childrenHTML.elements.formSend}
        </div>
        {this.childrenHTML.elements.addUser}
        {this.childrenHTML.elements.removeUser}
      </div>
    )
  }
}
