import { EventBus } from '@/core/EventBus'

export const SearchEventBus = new EventBus()

export enum EVENTS {
  VISIBLE = 'VISIBLE',
  INPUT_ON_CHANGE = 'ON_CHANGR_INPUT',
  INPUT_FOCUS = 'INPUT_FOCUS',
}
