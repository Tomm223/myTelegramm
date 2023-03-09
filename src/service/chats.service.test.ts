import { ChatList } from 'src/types/chats'
import { ChatsController } from '@/service/chats.service'
import Store from '@/store/index'
import Actions from '@/store/Actions'

describe('ChatsController', () => {
  let list: ChatList[]
  beforeEach(() => {
    // Actions.resetStore()
    list = [
      { avatar: null, id: 1, title: 'One', unread_count: 0, last_message: null },
      { avatar: null, id: 2, title: 'Two', unread_count: 0, last_message: null },
    ]
  })

  // test('getChatToken', async () => {
  //   const token = { sdsd: 'sdds', a: 1 }
  //   const id = 343

  //   const controller = new ChatsController(token)
  //   await controller.getChatToken(id)

  //   const { token: tokenCheck, chatID: idCheck } = Store.getState().chat

  //   expect(tokenCheck).toBe(token)
  //   expect(idCheck).toBe(id)
  // })

  test('getNewChatList', async () => {
    const controller = new ChatsController(list)
    await controller.getNewChatList({ limit: 0, offset: 0, title: '' })

    const chatList = Actions.getChatList()

    expect(chatList).toEqual(list)
  })
  test('createChat', async () => {
    const controller = new ChatsController(list)
    await controller.createChat('Tree')

    const chatList = Actions.getChatList()

    expect(chatList).toEqual(list)
  })
  test('removeChat', async () => {
    const controller = new ChatsController(list)
    await controller.removeChat(3)

    const chatList = Actions.getChatList()

    expect(chatList).toEqual(list)
  })

  test('pushNewChats', async () => {
    Actions.setChatList(list)

    const controller = new ChatsController(list)
    await controller.pushNewChats({ limit: 0, offset: 0, title: '' })

    const chatList = Actions.getChatList()

    expect(chatList).toEqual([...list, ...list])
  })

  test('pushNewChats: response=[]', async () => {
    Actions.setChatList(list)

    const controller = new ChatsController([])
    await controller.pushNewChats({ limit: 0, offset: 0, title: '' })

    const chatList = Actions.getChatList()
    const isAll = Store.getState().listChats.isAll

    expect(chatList).toEqual(list)
    expect(isAll).toEqual(true)
  })
})
