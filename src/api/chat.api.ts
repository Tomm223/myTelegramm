import { HTTPTransport } from '@/http/index'
import { BaseAPI } from '@/http/base'

const chatAPIInstance = new HTTPTransport('api/v1/chats')

class ChatAPI extends BaseAPI {}
