export interface ChatList {
  id: number
  title: string //name chat
  avatar: string //"/123/avatar1.jpg"
  unread_count: number // колличество непрочитанных
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string //"/path/to/avatar.jpg"
      email: string
      login: string
      phone: string
    }
    time: string //"2020-01-02T14:22:22.000Z"
    content: string //"this is message content"
  }
}

export interface Message {
  user: {
    first_name: string
    second_name: string
    avatar: string //"/path/to/avatar.jpg"
    email: string
    login: string
    phone: string
  }
  time: string //"2020-01-02T14:22:22.000Z"
  content: string
}
