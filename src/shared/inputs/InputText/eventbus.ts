import { EventBus } from '@/utils/EventBus'

export const InputTextEventBus = new EventBus()

export const EVENTS = {
  ONCHANGE: (id: string | number) => `ON_CHANGE_id:${id}`,
}
