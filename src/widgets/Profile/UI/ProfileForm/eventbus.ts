import { EventBus } from '@/utils/EventBus'

export const ProfileFormEventBus = new EventBus()

export enum ProfileFormEVENTS {
  PERSON_NO_EDIT = 'PERSON_NO_EDIT',
  PERSON_EDIT = 'PERSON_EDIT',
  PASSWORD_EDIT = 'PASSWORD_EDIT',
  EXIT = 'EXIT',
}
