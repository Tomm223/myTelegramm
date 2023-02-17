import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Search from '@/entities/MessangerNav/Search'
import ChatsList from '@/entities/MessangerNav/ChatsList'
import { ChatList } from 'src/types/chats'
import LinkToProfile from '@/entities/MessangerNav/LinkToProfile'
import Component from '@/core/Component'
import { ChatNavEventBus, CHATNAVEVENTS } from './eventbus'
import { EventBus } from '@/core/EventBus'
import Actions from '@/store/Actions'

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
    // this.setProps({ filter: string })
    Actions.setSearchChatList(string)
  }

  protected render(): HTMLElement {
    return (
      <nav class={styles.nav}>
        <div class={styles.nav__link}>{new LinkToProfile({ href: '/setting' }).getContent()}</div>
        <div class={styles.nav__search}>{this.childrenHTML.elements.search}</div>
        <div class={styles.nav__overflow}>{this.childrenHTML.elements.list}</div>
      </nav>
    )
  }
}

/* */
