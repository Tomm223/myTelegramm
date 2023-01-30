import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Search from '@/shared/form/Search'
import ChatsList from '@/entities/MessangerNav/ChatsList'
import { ChatList } from 'src/types/chats'
import LinkToProfile from '@/entities/MessangerNav/LinkToProfile'
import Component from '@/utils/Component'

interface ChatNavType {
  gg?: ChatList
  search?: Component
}

export default class ChatNav extends Component<ChatNavType> {
  constructor(props: ChatNavType) {
    props.search = new Search({ inputName: 'message' })
    props.gg = {
      avatar: 'static/',
      id: 123,
      last_message: {
        content: `нужно чтобы текст переходил на след строчку(в сумме 2)
           и заканчивался на "..."  даже если много текста`,
        time: '2020-01-02T14:22:22.000Z',
        user: {
          avatar: 'sds',
          email: 'goga.com',
          first_name: 'Goga',
          second_name: 'Gogich',
          login: 'GogaOneLove',
          phone: '89539005757',
        },
      },
      title: 'Chat Lohov',
      unread_count: 15,
    }
    super(props)
  }

  protected render(): HTMLElement {
    return (
      <nav class={styles.nav}>
        <div class={styles.nav__link}>{LinkToProfile({ href: '/profile', onClick: () => {} })}</div>
        <div class={styles.nav__search}>{this.childrenHTML.elements.search}</div>
        <div class={styles.nav__overflow}>{ChatsList({ list: Array(15).fill(this.props.gg) })}</div>
      </nav>
    )
  }
}
