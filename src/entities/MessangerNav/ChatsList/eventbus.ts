import { EventBus } from './../../../utils/EventBus'

export const ChatListEventBus = new EventBus()

export enum ChatListEVENTS {
  TO_FILTER = 'TO_FILTER',
}
