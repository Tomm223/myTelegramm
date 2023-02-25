import { LoaderDefault } from '@/shared/Loaders/LoaderDefault/defualt'
import { ChatAPI } from '@/api/chats.api'
import Actions from '@/store/Actions'
import { GetChatsRequest } from '@/types/chats'

export class ChatListController {
  public async createChat(title: string) {
    try {
      const api = new ChatAPI()
      const status = await api.createChat(title)
      return status
    } catch {
      alert('Error Fronted Service')
    }
  }

  public async pushNewChats(data: GetChatsRequest) {
    try {
      const api = new ChatAPI()
      const list = await api.getChats(data)
      if (list.length) {
        Actions.pushChatList(list)
      } else {
        Actions.setIsAllChatList(true)
        console.log('pushNewCHats to all', list)
      }
    } catch {
      alert('Error Frontend Service')
    }
  }

  public async getNewChatList(data: GetChatsRequest) {
    try {
      const api = new ChatAPI()
      const list = await api.getChats(data)

      Actions.setChatList(list)
    } catch {
      alert('Error Frontend Service')
    }
  }
}
