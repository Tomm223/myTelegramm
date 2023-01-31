import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Search from '@/entities/MessangerNav/Search'
import ChatsList from '@/entities/MessangerNav/ChatsList'
import { ChatList } from 'src/types/chats'
import LinkToProfile from '@/entities/MessangerNav/LinkToProfile'
import Component from '@/utils/Component'
import { ChatNavEventBus, CHATNAVEVENTS } from './eventbus'
import { EventBus } from '@/utils/EventBus'

interface ChatNavType {
  list?: Component
  gg?: ChatList
  search?: Component
  filter?: string
}

export default class ChatNav extends Component<ChatNavType> {
  constructor(props: ChatNavType) {
    props.search = new Search({
      inputName: 'search',
      onChange: (value: string) => ChatNavEventBus.emit(CHATNAVEVENTS.CHANGE_LIST, value),
    })
    props.list = new ChatsList({})

    super(props)
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ChatNavEventBus.on(CHATNAVEVENTS.CHANGE_LIST, this.handleChangeFilter.bind(this))
  }

  handleChangeFilter(string: string) {
    this.setProps({ filter: string })
  }

  protected componentDidUpdate(oldProps: ChatNavType, newProps: ChatNavType): void {
    console.log('update nav')
  }

  protected render(): HTMLElement {
    return (
      <nav class={styles.nav}>
        <div class={styles.nav__link}>{LinkToProfile({ href: '/profile', onClick: () => {} })}</div>
        <div class={styles.nav__search}>{this.childrenHTML.elements.search}</div>
        <div class={styles.nav__overflow}>{this.childrenHTML.elements.list}</div>
      </nav>
    )
  }
}

/* */
