import { ChatAPI } from '@/api/chats.api'
import Actions from '@/store/Actions'
import { GetChatsRequest } from '@/types/chats'

export class ChatListController {
  public async createChat(title: string) {
    const api = new ChatAPI()
    const status = await api.createChat(title)
    return status
  }

  public async pushNewChats(data: GetChatsRequest) {
    const api = new ChatAPI()
    const list = await api.getChats(data)
    Actions.pushChatList(list)
  }

  public async getNewChatList(data: GetChatsRequest) {
    const api = new ChatAPI()
    const list = await api.getChats(data)
    Actions.setChatList(list)
  }
}
