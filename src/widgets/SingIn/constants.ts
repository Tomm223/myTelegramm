import { ValidatesForm } from '@/shared/form/FormConstructor/validates.reg'
import { ValidateForm, StateForm } from './../../shared/form/FormConstructor/types'

export const StateSingIn: StateForm = {
  login: '',
  password: '',
}

export const ValidateSingIn: ValidateForm = {
  login: ValidatesForm.login,
  password: ValidatesForm.password,
}
