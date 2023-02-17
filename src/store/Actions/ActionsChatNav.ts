import { ChatList } from '@/types/chats'
import Store from '../Store'

const store = new Store()

type ActionGetList = () => ChatList[] | []

const getChatList: ActionGetList = () => {
  let list = store.getState().listChats

  return list
}
const getChatListSearch = () => {
  return store.getState().search
}
const getFilterChatList: ActionGetList = () => {
  let string = getChatListSearch()
  let list = getChatList()
  console.log('list', list)
  console.log('str', store)

  if (!list.length) {
    return []
  }
  if (string === '') {
    return list
  }
  return list.filter((item) => item.title.toLowerCase().includes(string.toLowerCase()))
}

const setChatList: (list: ChatList[]) => void = (list) => {
  store.set('listChats', list)
}

const setSearchChatList: (string: string) => void = (string) => {
  console.log('work')

  store.set('search', string)
}

export type NavType = {
  getFilterChatList: ActionGetList
  getChatList: ActionGetList
  getChatListSearch: () => any
  setChatList: (list: ChatList[]) => void
  setSearchChatList: (string: string) => void
}
const nav: NavType = {
  setSearchChatList,
  getFilterChatList,
  getChatList,
  getChatListSearch,
  setChatList,
}
export default nav
