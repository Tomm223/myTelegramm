import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Chat from '@/widgets/Chat'
import ChatNav from '@/widgets/ChatsNav'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import { MessengerEventBus, MessengerEVENTS } from './eventbus'
import NoSelectChat from '@/entities/NoSelectChat'
import Actions from '@/store/Actions'

interface MessangerType {
  nav?: Component
  chat?: Component
  noChat?: Component
  bus?: () => EventBus
  chatID?: number | null
  token?: string | null
}

export function subsOnClickInMessengerPage(fn: (...args: any) => void) {
  MessengerEventBus.on(MessengerEVENTS.click, fn)
}

export default class Messenger extends Component<MessangerType> {
  constructor(props: MessangerType) {
    props.nav = new ChatNav({})
    props.chat = new Chat({})
    props.noChat = new NoSelectChat({})
    super(props)
  }

  handleClick(e: MouseEvent) {
    e.preventDefault()
    MessengerEventBus.emit(MessengerEVENTS.click, e)
  }

  handleKeyEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      Actions.resetChat()
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
    document.addEventListener('keyup', this.handleKeyEscape.bind(this))
  }

  protected removeEvents(): void {
    this._element?.removeEventListener('click', this.handleClick.bind(this))
    document.removeEventListener('keyup', this.handleKeyEscape.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.main}>
        <div class={styles.container}>
          {this.childrenHTML.elements.nav}
          {this.props.chatID && this.props.token
            ? this.childrenHTML.elements.chat
            : this.childrenHTML.elements.noChat}
        </div>
      </div>
    )
  }
}
