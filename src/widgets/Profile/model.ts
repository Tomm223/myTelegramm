import { EventBus } from '@/utils/EventBus'

export const ProfileEventBus = new EventBus()

export enum ProfileEVENTS {
  PERSON_NO_EDIT = 'PERSON_NO_EDIT',
  PERSON_EDIT = 'PERSON_EDIT',
  PASSWORD_EDIT = 'PASSWORD_EDIT',
  EXIT = 'EXIT',
}
