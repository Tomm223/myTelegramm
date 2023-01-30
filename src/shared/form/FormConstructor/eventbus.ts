import { EventBus } from '@/utils/EventBus'

export const FormConstrEventBus = new EventBus()

export const EVENTS = {
  CHECK_VALID: 'CHECK_VALID', // (id: string | number) => `CHECK_VALID_id:${id}`,
  SUBMIT: 'SUBMIT', //(id: string | number) => `SUBMIT_id:${id}`,
}
