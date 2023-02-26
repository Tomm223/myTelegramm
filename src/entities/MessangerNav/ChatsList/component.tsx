import CompileMaster from '@/core/CompileJSX'
import { ChatList } from '@/types/chats'
import Component from '@/core/Component'
import ChatsListItem from './ui/ListItem'
import styles from './styles.module.scss'
import Actions from '@/store/Actions'
import ItemCreateChat from './ui/ItemCreateChat'
import LoaderDefault from '@/shared/Loaders/LoaderDefault/defualt'
import { ChatsController } from '@/service/chats.service'
import ModalFormDefault from '@/shared/modals/ModalFormDefault'
import InputText from '@/shared/inputs/InputText'
import { debounce } from '@/utils/debounce'
import { deepEqual } from '@/core/deepEqual'
import { ChatAPI } from '@/api/chats.api'

interface ChatsUl {
  list: ChatList[] | []
  loading?: boolean
  isAll?: boolean
  loader?: Component
  button?: Component
  modal?: Component
  scroll?: {
    top: number
  }
}

export default class ChatsList extends Component<ChatsUl> {
  // public API: ChatListController

  constructor(props: ChatsUl) {
    // this.API = new ChatListController()
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

  protected removeEvents(): void {
    this._element?.removeEventListener('scroll', debounce(this.handleScroll.bind(this), 200))
  }

  handleScroll() {
    if (this.props.isAll) return

    const ul = this._element?.getElementsByTagName('ul')[0] as HTMLUListElement

    const bottom = this._element
      ?.getElementsByClassName(styles.last)[0]
      .getBoundingClientRect().bottom
    const height = window.screen.height

    if (this.props.loading) return
    if (!bottom) return
    if (bottom >= height) return

    const offset = Actions.getChatListOffset()
    this.pushNewItemsChatList(offset)
  }

  pushNewItemsChatList(number: number) {
    //save scrollTop pos
    const top = this._element?.scrollTop
    this.setProps({ scroll: { top: Number(top) }, list: this.props.list })
    Actions.pushNewItemsChat()
  }

  setIsOpenModal(bool: boolean) {
    const modal = this.children.modal as Component
    modal.setProps({ isOpen: bool })
  }

  async createChat(data: Record<string, any>) {
    const api = new ChatsController()
    const title = data.create_chat

    await api.createChat(title)
    this.setIsOpenModal(false)
    await Actions.setNewChatList()
  }

  correctedScroll() {
    if (this.props.scroll) {
      const div = this._element as HTMLDivElement
      div.scrollTop = this.props.scroll.top
    }
  }

  createChatList() {
    const api = new ChatsController()

    const appi = new ChatAPI()

    // this.props.list.map((item) => {
    //   console.log(appi.getChatById(item.id))
    // })

    let listItem = this.props.list?.map((item) =>
      new ChatsListItem({
        chat: item,
        onClick: async (id: number) => {
          try {
            const result = await api.getChatToken(id)
            Actions.setTitleAndAvatarChat(item.title, item.avatar)
          } catch {}
        },
      }).getContent()
    )
    // add to first btn createChat
    if (listItem) {
      listItem.unshift(this.childrenHTML.elements.button)
    }
    return listItem
  }

  protected shouldComponentUpdate(oldProps: ChatsUl, newProps: ChatsUl): boolean {
    return !deepEqual({ ...oldProps, scroll: null }, { ...newProps, scroll: null })
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
      listItem = this.createChatList()
    }

    return (
      <div class={styles.overflow}>
        <ul class={styles.list}>
          {...listItem}
          <div
            class={styles.last}
            style={this.props.loading && this.props.list.length ? '' : 'opacity:0;'}
          >
            {this.props.loading && this.props.list.length ? (
              this.childrenHTML.elements.loader
            ) : (
              <div></div>
            )}
          </div>
        </ul>
        {this.childrenHTML.elements.modal}
      </div>
    )
  }
}

// доделал передачу переменных title+avatar В state.chat  для пользования ChatHeader
// проверь как работает?
//
// + работа очистки при переходе и выходе их чатов не работает корректно!!
//
// + сделать загрузку следующих сообщений если видна 5 с конца,
// в методах mount + didUpdata такую штуку запускать
//
// + я наверное написал николаю узнать как делать add/remove user in chat
