import { EventBus } from '../../../core/EventBus'

export const ChatListEventBus = new EventBus()

export enum ChatListEVENTS {
  TO_FILTER = 'TO_FILTER',
}
