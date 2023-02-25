import { ChatList, GetChatsRequest } from '@/types/chats'
import { HTTP } from '@/http/index'
import { getBoolOfStatusCode } from './helpers/getBoolOfStatusCode'

const ChatHTTP = HTTP('/chats')

export class ChatAPI {
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
}
