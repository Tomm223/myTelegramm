//'wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>'
const API_WS_CHAT = process.env.API_WS_CHAT

interface ChatWebSocketServiceType {
  userID: number
  chatID: number
  token: string
}

export class ChatWebSocketService {
  private socket: WebSocket

  private chatID: number

  private token: string

  private userID: number

  constructor(
    params: ChatWebSocketServiceType,
    handleMessages: (event: MessageEvent<any>) => void
  ) {
    const { chatID, token, userID } = params

    this.chatID = chatID
    this.token = token
    this.userID = userID

    this.handlerMessages = handleMessages

    this.subscribe()
  }

  reFetch(params: ChatWebSocketServiceType) {
    const { chatID, token, userID } = params

    this.chatID = chatID
    this.token = token
    this.userID = userID

    this.subscribe()
  }

  protected subscribe() {
    this.socket = new WebSocket(API_WS_CHAT + `/${this.userID}/${this.chatID}/${this.token}`)

    this.socket.addEventListener('open', this.handlerOpen.bind(this))
    this.socket.addEventListener('close', this.handlerClose.bind(this))
    this.socket.addEventListener('message', this.handlerMessages.bind(this))
    this.socket.addEventListener('error', this.handlerError.bind(this))
  }

  handlerOpen() {
    this.getMessages(0)
  }

  handlerClose(event: any) {
    if (event.code == 1006) {
      this.subscribe()
    }
  }

  handlerMessages(event: MessageEvent<any>) {
    console.log('Получены данные', event.data)
  }

  handlerError(event: any) {
    console.log('Ошибка', event.message)
  }

  getMessages(offset: number) {
    this.socket.send(
      JSON.stringify({
        content: `${offset}`,
        type: 'get old',
      })
    )
  }

  sendMessage(data: string) {
    this.socket.send(
      JSON.stringify({
        content: data,
        type: 'message',
      })
    )
  }

  closeWebsocket() {
    this.socket.close(1000, 'работа завершена')
  }
}

// //  wss://ya-praktikum.tech/ws/chats/308636/4054/b2a3de4d397be57498879
// const socket =
//new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>')

// // обработка сокета
// socket.send(
//   JSON.stringify({
//     content: 'Моё первое сообщение миру!',
//     type: 'message',
//   })
// )

// tests ~$ npm install --save-dev mocha @types/mocha chai @types/chai
// config .mocharc.json
// {
//    "extension": ["ts"],
//    "spec": "test/**/*.spec.ts",
//    "require": "test/babel-register.js"
// }
// run ~$ ./node_modules/.bin/mocha  || npx mocha src/
