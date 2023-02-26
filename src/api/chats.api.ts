import { ChatList, GetChatsRequest } from '@/types/chats'
import { HTTP } from '@/http/index'
import { getBoolOfStatusCode } from './helpers/getBoolOfStatusCode'

const ChatHTTP = HTTP('/chats')

export class ChatAPI {
  getChatById(id: number) {
    return ChatHTTP.get(`/${id}`).then((resp) => JSON.parse(resp.response))
  }

  addUser(param: { chatID: number; userID: number }) {
    const data = {
      users: [param.userID],
      chatId: param.chatID,
    }
    return ChatHTTP.put('', { data }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  removeUser(param: { chatID: number; userID: number }) {
    const data = {
      users: [param.userID],
      chatId: param.chatID,
    }
    return ChatHTTP.delete('', { data }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  createChat(title: string): Promise<boolean> {
    return ChatHTTP.post('', { data: { title } }).then((resp) => getBoolOfStatusCode(resp.status))
  }

  getChats(data: GetChatsRequest): Promise<ChatList[]> {
    // ?offset=12&limit=12&title=dfdf
    if (!data.title) {
      data = { offset: data.offset, limit: data.limit }
    }
    return ChatHTTP.get('', { data }).then((resp) => JSON.parse(resp.response))
  }

  getChatToken(id: number): Promise<string | null> {
    return ChatHTTP.post(`/token/${id}`, { data: { id } })
      .then((resp) => {
        const status = getBoolOfStatusCode(resp.status)

        if (status) {
          return JSON.parse(resp.response)
        } else {
          return null
        }
      })
      .then((resp) => resp.token)
  }
}
