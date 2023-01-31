import { EventBus } from '@/utils/EventBus'

export const ChatNavEventBus = new EventBus()

export enum CHATNAVEVENTS {
  CHANGE_LIST = 'CHANGE_LIST',
}
