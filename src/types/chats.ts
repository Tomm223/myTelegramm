export interface ChatList {
  id: number
  title: string //name chat
  avatar: string //"/123/avatar1.jpg"
  unread_count: number // колличество непрочитанных
  last_message?: ChatListMessage
}

export interface ChatListMessage {
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
export interface Message {
  id: number
  user_id: number
  chat_id: number
  type: string
  time: string
  content: string
  is_read: boolean
  file: any | null
}

export interface CreateChatRequest {
  title: string
}

export interface GetChatsRequest {
  offset: number
  limit: number
  title?: string
}
