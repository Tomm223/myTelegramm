import CompileMaster from '@/core/CompileJSX'
import { ChatList } from '@/types/chats'
import ChatsListItem from './item'
import styles from './styles.module.scss'

interface ChatsUl {
  list: ChatList[]
}

const gg: ChatList = {
  avatar: 'static/',
  id: 123,
  last_message: {
    content: 'Hello peter',
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
  unread_count: 1,
}

export default function ChatsList({ list }: ChatsUl) {
  console.log(list)

  return <ul class={styles.list}>{...list.map((item) => ChatsListItem(item))}</ul>
}
