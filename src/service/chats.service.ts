import { ChatAPI } from '@/api/chats.api'
import Actions from '@/store/Actions'
import { GetChatsRequest } from '@/types/chats'

export class ChatsController {
  public async addUser(param: { chatID: number; userID: number }) {
    try {
      const api = new ChatAPI()
      const status = await api.addUser(param)

      if (status) {
        alert('Вы добавили пользователя в чат')
      } else {
        throw new Error('')
      }
    } catch {
      alert('Error adding user to chat')
    }
  }

  public async removeUser(param: { chatID: number; userID: number }) {
    try {
      const api = new ChatAPI()
      const status = await api.removeUser(param)

      if (status) {
        alert('Вы удалили пользователя из чат')
      } else {
        throw new Error('')
      }
    } catch {
      alert('Error adding user to chat')
    }
  }

  public async getChatToken(id: number) {
    try {
      const api = new ChatAPI()
      const token = await api.getChatToken(id)

      if (!token) {
        throw new Error('')
      }
      Actions.setChatIDAndToken(id, token)
    } catch {
      alert('Error Connect chat')
    }
  }

  public async createChat(title: string) {
    try {
      const api = new ChatAPI()
      const status = await api.createChat(title)
      if (!status) {
        alert('Вы не можете удалять этот чат')
        return status
      }
      Actions.setNewChatList()
      alert(`Вы создали чат "${title}"`)
      return status
    } catch {
      alert('Error CreateChat Fronted Service')
    }
  }

  public async removeChat(id: number) {
    try {
      const api = new ChatAPI()
      const status = await api.removeChat(id)
      if (typeof status === 'boolean') {
        alert('Вы не можете удалять этот чат')
        return status
      }

      Actions.setNewChatList()
      Actions.resetChat()
      alert(`Вы удалили чат ${status.result.title}`)
      return true
    } catch {
      alert('Error CreateChat Fronted Service')
    }
  }

  public async pushNewChats(data: GetChatsRequest) {
    try {
      Actions.startChatListLoading()
      const api = new ChatAPI()
      const list = await api.getChats(data)
      if (list.length) {
        Actions.pushChatList(list)
      } else {
        Actions.setIsAllChatList(true)
      }
    } catch {
      alert('Error PushNewChatList Frontend Service')
    }
  }

  public async getNewChatList(data: GetChatsRequest) {
    try {
      const api = new ChatAPI()
      const list = await api.getChats(data)

      Actions.setChatList(list)
    } catch {
      alert('Error GetNewChatList Frontend Service')
    }
  }
}
