import { EventBus } from '@/core/EventBus'

export const ChatNavEventBus = new EventBus()

export enum CHATNAVEVENTS {
  CHANGE_LIST = 'CHANGE_LIST',
}
