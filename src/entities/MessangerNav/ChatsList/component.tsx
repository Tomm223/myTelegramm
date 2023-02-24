import CompileMaster from '@/core/CompileJSX'
import { ChatList } from '@/types/chats'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import ChatsListItem from './ui/ListItem'
import styles from './styles.module.scss'
import Actions from '@/store/Actions'
import ItemCreateChat from './ui/ItemCreateChat'
import LoaderDefault from '@/shared/Loaders/LoaderDefault/defualt'
import { ChatListController } from '@/service/chats.service'
import ModalFormDefault from '@/shared/modals/ModalFormDefault'
import InputText from '@/shared/inputs/InputText'
import ModalCreateChat from '@/entities/modals/ModalCreateChat'
import Store from '@/store/Store'
import { debounce } from '@/utils/debounce'

interface ChatsUl {
  list: ChatList[] | []
  loading?: boolean
  loader?: Component
  button?: Component
  modal?: Component
  scroll?: {
    top: number
  }
}

export default class ChatsList extends Component<ChatsUl> {
  public API = new ChatListController()

  constructor(props: ChatsUl) {
    props.loader = new LoaderDefault({})
    super(props)
  }

  protected init(): void {
    this.children.button = new ItemCreateChat({
      onClick: () => {
        const fn = this.setIsOpenModal.bind(this)
        fn(true)
      },
    })

    this.children.modal = new ModalFormDefault({
      inputs: [new InputText({ label: 'Имя чата', name: 'create_chat' })],
      isOpen: false,
      onSubmit: this.createChat.bind(this),
      title: 'Создать новый чат',
    })
  }

  protected addEvents(): void {
    this._element?.addEventListener('scroll', debounce(this.handleScroll.bind(this), 200))
  }

  handleScroll() {
    const ul = this._element?.getElementsByTagName('ul')[0] as HTMLUListElement

    const bottom = this._element?.getElementsByClassName('last')[0].getBoundingClientRect().bottom
    const height = window.screen.height

    if (!bottom) return

    if (bottom <= height) {
      const nextOffset = Actions.getChatListLimit() || 20
      const oldOffset = Actions.getChatListOffset() || 20
      this.pushNewItemsChatList(oldOffset + nextOffset)
    }
  }

  pushNewItemsChatList(number: number) {
    //save scrollTop pos
    const top = this._element?.scrollTop
    this.setProps({ scroll: { top: Number(top) }, list: this.props.list })
    //
    Actions.setChatListOffset(number)
  }

  setIsOpenModal(bool: boolean) {
    const modal = this.children.modal as Component
    modal.setProps({ isOpen: bool })
  }

  async createChat(data: Record<string, any>) {
    const title = data.create_chat

    await this.API.createChat(title)
    this.setIsOpenModal(false)
    await Actions.setNewChatList()
  }

  correctedScroll() {
    if (this.props.scroll) {
      const div = this._element as HTMLDivElement
      div.scrollTop = this.props.scroll.top
    }
  }

  protected componentDidUpdate(oldProps: ChatsUl, newProps: ChatsUl): void {
    this.correctedScroll()
  }

  protected componentDidMount(): void {
    Actions.setNewChatList()
  }

  protected render(): HTMLElement {
    let listItem: Array<any>

    if (this.props.loading && !this.props.list.length) {
      listItem = [this.childrenHTML.elements.loader]
    } else {
      listItem = this.props.list?.map((item) => new ChatsListItem(item).getContent())
      // add to first btn createChat
      if (listItem) {
        listItem.unshift(this.childrenHTML.elements.button)
      }
    }
    return (
      <div class={styles.overflow}>
        <ul class={styles.list}>
          {...listItem}
          <div class="last" style={this.props.loading && this.props.list ? 'opacity:0;' : ''}>
            {/* {this.childrenHTML.elements.loader} */}
            {/* {this.props.loading && this.props.list ? (
              this.childrenHTML.elements.loader
            ) : (
              <div></div>
            )} */}
          </div>
        </ul>
        {this.childrenHTML.elements.modal}
      </div>
    )
  }
}
