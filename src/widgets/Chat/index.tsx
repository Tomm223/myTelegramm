import CompileMaster from '@/core/CompileJSX'
import Header from './UI/Header'
import styles from './styles.module.scss'

import Plus from '@/static/icons/plus.svg'
import Krest from '@/static/icons/krest.svg'
import Img from 'static/icons/pics_message.png'
import FormSend from './UI/FormSend'
import MessageScreen from './UI/MessageScreen'
import AddUser from '@/entities/modals/AddUser'
import RemoveUser from '@/entities/modals/RemoveUser'
import Component from '@/utils/Component'
import MenuChat from './UI/MenuChat'
import ButtonMenu from './UI/MenuChat/ButtonMenu'
import { EventBus } from '@/utils/EventBus'
import { ChatEventBus, CHATEVENTS } from './eventbus'

interface ChatType {
  isAddUser?: boolean
  isRemoveUser?: boolean
  header?: Component
  addUser?: Component
  removeUser?: Component
  messageList?: Component
  formSend?: Component
}

export default class Chat extends Component<ChatType> {
  constructor(props: ChatType) {
    props.header = new Header({
      img: Img,
      title: 'Вадим Яшин',
      menu: new MenuChat({
        ref: 'menu',
        buttons: [
          new ButtonMenu({
            img: Plus,
            text: 'Добавить пользователя',
            events: {
              click: () => {
                ChatEventBus.emit(CHATEVENTS.ADDUSER)
                // this.setProps({})
              },
            },
          }),
          new ButtonMenu({
            img: Krest,
            text: 'Удалить пользователя',
            events: {
              click: () => {
                ChatEventBus.emit(CHATEVENTS.REMOVEUSER)
              },
            },
          }),
        ],
      }),
    })
    props.messageList = new MessageScreen({ messages: Array(15) })
    props.formSend = new FormSend({})

    super(props)
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ChatEventBus.on(CHATEVENTS.ADDUSER, this.handleAddUser.bind(this))
    ChatEventBus.on(CHATEVENTS.REMOVEUSER, this.handleRemoveUser.bind(this))
  }

  handleAddUser() {
    if (this.props.isAddUser) {
      this.setProps({ isAddUser: false })
    } else {
      this.setProps({ isAddUser: true })
    }
  }

  handleRemoveUser() {
    if (this.props.isRemoveUser) {
      this.setProps({ isRemoveUser: false })
    } else {
      this.setProps({ isRemoveUser: true })
    }
  }

  protected componentDidMount(): void {
    console.log('mount')
  }

  // <div class={styles.form}>{this.childrenHTML.elements.formSend}</div>

  protected render(): HTMLElement {
    return (
      <div class={styles.container}>
        <div class={styles.block}>
          {this.childrenHTML.elements.header}
          {this.childrenHTML.elements.messageList}
          {this.childrenHTML.elements.formSend}
        </div>
        {new AddUser({
          size: { width: '340px', height: '260px' },
          isOpen: this.props.isAddUser || false,
          onClose: () => this.setProps({ isAddUser: false }),
          onSubmit: (form) => {},
        }).getContent()}
        {new RemoveUser({
          size: { width: '340px', height: '260px' },
          isOpen: this.props.isRemoveUser || false,
          onClose: () => this.setProps({ isRemoveUser: false }),
          onSubmit: (form) => {},
        }).getContent()}
      </div>
    )
  }
}
