import CompileMaster from '@/core/CompileJSX'
import Header from './UI/Header'
import styles from './styles.module.scss'

import Plus from '@/static/icons/plus.svg'
import Krest from '@/static/icons/krest.svg'
import Img from 'static/icons/pics_message.png'
import FormSend from './UI/FormSend'
import MessageScreen from './UI/MessageScreen/'
import AddUser from '@/entities/modals/AddUser'
import RemoveUser from '@/entities/modals/RemoveUser'
import Component from '@/core/Component'
import MenuChat from './UI/MenuChat'
import ButtonMenu from './UI/MenuChat/ButtonMenu'
import { EventBus } from '@/core/EventBus'
import { ChatEventBus, CHATEVENTS } from './eventbus'

interface ChatType {
  header?: Component
  addUser?: Component
  removeUser?: Component
  messageList?: Component
  formSend?: Component
}

function handleSubmit(form: any) {
  console.log(form)
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
    props.messageList = new MessageScreen()
    props.formSend = new FormSend({})

    props.addUser = new AddUser({
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: handleSubmit,
    })

    props.removeUser = new RemoveUser({
      size: { width: '340px', height: '260px' },
      isOpen: false,
      onSubmit: handleSubmit,
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
    let modal = this.children.addUser
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
    console.log('rere', modal)
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

  protected render(): HTMLElement {
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
