import { EventBus } from '@/core/EventBus'

export const FormConstrEventBus = new EventBus()

export const FormConstrEVENTS = {
  CHECK_VALID: (id: string | number) => `CHECK_VALID_id:${id}`,
  SUBMIT: (id: string | number) => `SUBMIT_id:${id}`,
}
