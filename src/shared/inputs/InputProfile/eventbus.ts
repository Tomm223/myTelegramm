import { EventBus } from '@/core/EventBus'

export const InputProfileEventBus = new EventBus()

export const InputProfileEVENTS = {
  CHANGE: (id: string | number) => 'CHANGE_id:' + id,
}
