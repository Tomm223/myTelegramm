import { Message } from '@/types/chats'
import Store from '../Store'

const store = new Store()

const setChatIDAndToken = (id: number, token: string) => {
  let oldChat = store.getState().chat
  store.set('chat', { ...oldChat, token, chatID: id })
}

const setTitleAndAvatarChat = (title: string, avatar: string | null) => {
  let oldChat = store.getState().chat
  store.set('chat', { ...oldChat, title, avatar })
}

const getChatID = () => {
  return store.getState().chat.chatID
}

const pushChatMessages: (msgs: Message[]) => void = (msgs) => {
  let oldChat = store.getState().chat
  const newMessage = [...oldChat.messages, ...msgs]

  store.set('chat', { ...oldChat, messages: newMessage, loading: false })
}

const setChatMessages: (msgs: Message[]) => void = (msgs) => {
  let oldChat = store.getState().chat

  store.set('chat', { ...oldChat, messages: msgs, loading: false })
}

const resetChat = () => {
  store.set('chat', {
    chatID: null,
    token: null,
    messages: [],
    loading: false,
  })
}

const startLoadingChatMessages: () => void = () => {
  let oldChat = store.getState().chat

  store.set('chat', { ...oldChat, loading: true })
}

const logoutOfChat = () => {
  store.set('chat', { chatID: null, token: null, messages: [], page: 0, loading: false })
}

export type ActionChat = {
  resetChat: () => void
  logoutOfChat: () => void
  setChatMessages: (msgs: Message[]) => void
  pushChatMessages: (msgs: Message[]) => void
  startLoadingChatMessages: () => void
  setChatIDAndToken: (id: number, token: string) => void
  getChatID: () => number | null
  setTitleAndAvatarChat: (title: string, avatar: string | null) => void
}

const actions: ActionChat = {
  setTitleAndAvatarChat,
  getChatID,
  resetChat,
  logoutOfChat,
  setChatIDAndToken,
  setChatMessages,
  pushChatMessages,
  startLoadingChatMessages,
}

export default actions
