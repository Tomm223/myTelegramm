import { EventBus } from '@/core/EventBus'

export const ButtonMenuBus = new EventBus()

export const ButtonMenuEVENTS = {
  CLICK: (id: string | number) => `CLICK_id:${id}`,
}
