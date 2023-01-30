import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import { ValidatesForm } from '@/shared/form/FormConstructor/validates'

export const StateSingUp: StateForm = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  password: '',
  phone: '',
}

export const ValidateSingUp: ValidateForm = {
  email: ValidatesForm.email,
  login: ValidatesForm.login,
  first_name: ValidatesForm.first_name,
  second_name: ValidatesForm.second_name,
  password: ValidatesForm.password,
  phone: ValidatesForm.phone,
}
