import { EventBus } from '@/core/EventBus'

export const ChatEventBus = new EventBus()

export enum CHATEVENTS {
  ADDUSER = 'ADDUSER',
  REMOVEUSER = 'REMOVEUSER',
  REMOVECHAT = 'REMOVECHAT',
}
