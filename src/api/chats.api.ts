import { GetChatsRequest } from '@/types/chats'
import { HTTP } from '@/http/index'
import { getStatusCode } from './helpers/getStatusCode'

const ChatHTTP = HTTP('/chats')

export class ChatAPI {
  createChat(title: string): Promise<boolean> {
    return ChatHTTP.post('', { data: { title } }).then((resp) => getStatusCode(resp.status))
  }

  getChats(data: GetChatsRequest) {
    // ?offset=12&limit=12&title=dfdf
    if (!data.title) {
      data = { offset: data.offset, limit: data.limit }
    }
    return ChatHTTP.get('', { data }).then((resp) => JSON.parse(resp.response))
  }
}
