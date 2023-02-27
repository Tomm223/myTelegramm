<<<<<<< HEAD
import CompileMaster from '@/core/CompileJSX'
import { ChatList } from '@/types/chats'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import { list } from './constants'
import { ChatListEventBus, ChatListEVENTS } from './eventbus'
import ChatsListItem from './item'
import styles from './styles.module.scss'

interface ChatsUl {
  list?: ChatList[] | []
  filter?: string
}

export default class ChatsList extends Component<ChatsUl> {
  constructor(props: ChatsUl) {
    props.list = list
    super(props)
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ChatListEventBus.on(ChatListEVENTS.TO_FILTER, this.handleFilter.bind(this))
  }

  handleFilter(string: string) {
    this.setProps({ filter: string })
  }

  get getFilterList() {
    let result = this.props.list?.length ? this.props.list : []
    let string = this.props.filter || ''
    if (!string) {
      return result
    }
    return result?.filter((chat) => chat.title.toLowerCase().includes(string.toLowerCase()))
  }

  protected render(): HTMLElement {
    return (
      <ul class={styles.list}>
        {...this.getFilterList.map((item) => new ChatsListItem(item).getContent())}
        <div class="hidden">zero</div>
      </ul>
    )
  }
}
=======
import Actions from '@/store/Actions'
import { connect } from 'src/store/connect'
import ChatsList from './component'

function Map(state: any) {
  const { list, loading, isAll } = state.listChats
  const { chatID } = state.chat
  return { list, loading, isAll, chatIDSelected: chatID }
}
export default connect(ChatsList, Map)
>>>>>>> sprint_3
