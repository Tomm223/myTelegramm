import CompileMaster from '@/core/CompileJSX'
import { ChatList } from '@/types/chats'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import { ChatListEventBus, ChatListEVENTS } from './eventbus'
import ChatsListItem from './item'
import styles from './styles.module.scss'
import Actions from '@/store/Actions'
import { list } from './constants'

interface ChatsUl {
  list?: ChatList[] | []
}

export default class ChatsList extends Component<ChatsUl> {
  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    // ChatListEventBus.on(ChatListEVENTS.TO_FILTER, this.handleFilter.bind(this))
  }

  // handleFilter(string: string) {
  //   this.setProps({ filter: string })
  // }

  protected componentDidMount(): void {
    setTimeout(() => {
      Actions.setChatList(list)
    }, 3000)
  }

  protected render(): HTMLElement {
    let listItem

    if (this.props.list?.length) {
      listItem = Actions.getFilterChatList().map((item) => new ChatsListItem(item).getContent())
    } else {
      listItem = [<div>ЗАГРУЗКА....</div>]
    }
    return (
      <ul class={styles.list}>
        {...listItem}
        <div class="hidden">zero</div>
      </ul>
    )
  }
}
