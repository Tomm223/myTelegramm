import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Chat from '@/widgets/Chat'
import ChatNav from '@/widgets/ChatsNav'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import { MessengerEventBus, MessengerEVENTS } from './eventbus'

interface MessangerType {
  nav?: Component
  chat?: Component
  bus?: () => EventBus
}

export function subsOnClickInMessengerPage(fn: (...args: any) => void) {
  MessengerEventBus.on(MessengerEVENTS.click, fn)
}

export default class Messanger extends Component<MessangerType> {
  constructor(props: MessangerType) {
    props.nav = new ChatNav({})
    props.chat = new Chat({})

    super(props)
  }

  handleClick(e: MouseEvent) {
    e.preventDefault()
    MessengerEventBus.emit(MessengerEVENTS.click, e)
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.main}>
        <div class={styles.container}>
          {this.childrenHTML.elements.nav}
          {this.childrenHTML.elements.chat}
        </div>
      </div>
    )
  }
}
