import CompileMaster from '@/core/CompileJSX'
import Header from '@/entities/chat/Header'
import styles from './styles.module.scss'

import Plus from '@/static/icons/plus.svg'
import Krest from '@/static/icons/krest.svg'
import Img from 'static/icons/pics_message.png'
import FormSend from '@/entities/chat/FormSend'
import MessageScreen from '@/entities/chat/MessageScreen'
import AddUser from '@/entities/modals/AddUser'
import RemoveUser from '@/entities/modals/RemoveUser'
import Component from '@/utils/Component'
import MenuChat from '@/entities/chat/MenuChat'
import ButtonMenu from '@/entities/chat/MenuChat/ButtonMenu'
import { EventBus } from '@/utils/EventBus'
import { ChatEventBus, CHATEVENTS } from './eventbus'

interface ChatType {
  isAddUser?: boolean
  isRemoveUser?: boolean
  header?: Component
  addUser?: Component
  removeUser?: Component
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
              click: () => ChatEventBus.emit(CHATEVENTS.ADDUSER),
            },
          }),
          new ButtonMenu({
            img: Krest,
            text: 'Удалить пользователя',
            events: { click: () => ChatEventBus.emit(CHATEVENTS.REMOVEUSER) },
          }),
        ],
      }),
    })
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
    console.log('gggg2')

    if (this.props.isRemoveUser) {
      this.setProps({ isRemoveUser: false })
    } else {
      this.setProps({ isRemoveUser: true })
    }
  }

  protected render(): HTMLElement {
    console.log('chat Rnder')

    return (
      <div class={styles.container}>
        {this.childrenHTML.elements.header}
        {MessageScreen({ messages: Array(15) })}
        <div class={styles.form}>{new FormSend({}).getContent()}</div>
        {new AddUser({
          size: { width: '340px', height: '260px' },
          isOpen: this.props.isAddUser || false,
          onClose: () => {},
          onSubmit: (form) => {},
        }).getContent()}
        {new RemoveUser({
          size: { width: '340px', height: '260px' },
          isOpen: this.props.isRemoveUser || false,
          onClose: () => {},
          onSubmit: (form) => {},
        }).getContent()}
      </div>
    )
  }
}
