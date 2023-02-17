import { Message } from '@/types/chats'
import Store from '../Store'

const store = new Store()

const setChatMessages: (msgs: Message[]) => void = (msgs) => {
  let oldChat = store.getState().chat

  store.set('chat', { ...oldChat, messages: msgs, loading: false })
}

const startLoadingChatMessages: () => void = () => {
  let oldChat = store.getState().chat

  store.set('chat', { ...oldChat, loading: true })
}

export type ActionChat = {
  setChatMessages: (msgs: Message[]) => void
  startLoadingChatMessages: () => void
}

const actions: ActionChat = {
  setChatMessages,
  startLoadingChatMessages,
}

export default actions
