import { ChatListController } from '@/service/chats.service'
import { ChatList } from '@/types/chats'
import Store from '../Store'

const store = new Store()

const api = new ChatListController()

type ActionGetList = () => ChatList[] | []

const setChatListLimit = (limit: number) => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, limit })
}

const pushNewItemsChat = async () => {
  const { limit, offset, search } = store.getState().listChats
  await api.pushNewChats({
    limit,
    offset,
    title: search,
  })
}

const setChatListOffset = (offset: number) => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, offset, loading: true })
  pushNewItemsChat()
}

const startChatListLoading = () => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, loading: true })
}

const getChatList: ActionGetList = () => {
  let list = store.getState().listChats.list

  return list
}
const getChatListLimit = () => {
  return store.getState().listChats.limit
}

const getChatListOffset = () => {
  return store.getState().listChats.offset
}

const getChatListSearch = () => {
  return store.getState().listChats.search
}

const getFilterChatList: ActionGetList = () => {
  let string = getChatListSearch()
  let list = getChatList()

  if (!list.length) {
    return []
  }
  if (string === '') {
    return list
  }
  return list.filter((item) => item.title.toLowerCase().includes(string.toLowerCase()))
}

const setIsAllChatList = (bool: boolean) => {
  const oldListState = store.getState().listChats

  store.set('listChats', { ...oldListState, isAll: bool, loading: false })
}

const setChatList: (list: ChatList[]) => void = (list) => {
  const oldListState = store.getState().listChats

  store.set('listChats', { ...oldListState, list, loading: false, isAll: false })
  console.log(store.getState().listChats)
}

const pushChatList: (list: ChatList[]) => void = (list) => {
  const oldListState = store.getState().listChats
  const newList = [...oldListState.list, ...list]

  store.set('listChats', { ...oldListState, list: newList, loading: false })
}

const setNewChatList = async () => {
  setChatListOffset(0)

  await api.getNewChatList({
    limit: getChatListLimit(),
    offset: getChatListOffset(),
    title: getChatListSearch(),
  })
}

const setSearchChatList: (search: string) => void = (search) => {
  const oldListState = store.getState().listChats
  store.set('listChats', { ...oldListState, search })

  setNewChatList()
}

export type NavType = {
  setNewChatList: () => Promise<void>
  getChatListOffset: () => number
  getFilterChatList: ActionGetList
  getChatList: ActionGetList
  getChatListSearch: () => any
  setChatList: (list: ChatList[]) => void
  setSearchChatList: (string: string) => void
  startChatListLoading: () => void
  pushChatList: (list: ChatList[]) => void
  setChatListOffset: (offset: number) => void
  setChatListLimit: (limit: number) => void
  getChatListLimit: () => number
  setIsAllChatList: (bool: boolean) => void
}
const nav: NavType = {
  setIsAllChatList,
  setNewChatList,
  getChatListOffset,
  getChatListLimit,
  setChatListLimit,
  setChatListOffset,
  pushChatList,
  startChatListLoading,
  setSearchChatList,
  getFilterChatList,
  getChatList,
  getChatListSearch,
  setChatList,
}
export default nav
