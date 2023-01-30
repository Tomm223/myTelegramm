import { EventBus } from '@/utils/EventBus'

export const ChatEventBus = new EventBus()

export enum CHATEVENTS {
  ADDUSER = 'ADDUSER',
  REMOVEUSER = 'REMOVEUSER',
}
