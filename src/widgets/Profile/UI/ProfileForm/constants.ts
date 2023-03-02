import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import { ValidatesForm } from '@/shared/form/FormConstructor/validates.reg'
import { UserType } from '@/types/user'

export const ProfileState: { data: StateForm; password: StateForm } = {
  data: {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    password: '',
    phone: '',
  },
  password: { old_password: '', password: '', repeat_password: '' },
}

export const ProfileValidate: { data: ValidateForm; password: ValidateForm } = {
  data: {
    email: ValidatesForm.email,
    login: ValidatesForm.login,
    first_name: ValidatesForm.first_name,
    display_name: ValidatesForm.first_name,
    second_name: ValidatesForm.second_name,
    phone: ValidatesForm.phone,
  },
  password: {
    old_password: ValidatesForm.password,
    password: ValidatesForm.password,
    repeat_password: ValidatesForm.password,
  },
}

export const PersonForm = (isEdit: boolean, user: UserType) => ({
  state: ProfileState.data,
  validate: ProfileValidate.data,
  inputs: [
    {
      isEdit: isEdit,
      label: 'Почта',
      name: 'email',
      text: user.email,
      type: 'text',
    },
    { isEdit: isEdit, label: 'Логин', name: 'login', text: user.login, type: 'text' },
    {
      isEdit: isEdit,
      label: 'Имя',
      name: 'first_name',
      text: user.first_name,
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Фамилия',
      name: 'second_name',
      text: user.second_name,
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Имя в чате',
      name: 'display_name',
      text: user.display_name,
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Телефон',
      name: 'phone',
      text: user.phone,
      type: 'number',
    },
  ],
})

export const PasswordForm = (isEdit: boolean) => ({
  state: ProfileState.password,
  validate: ProfileValidate.password,
  inputs: [
    {
      isEdit: isEdit,
      label: 'Старый пароль',
      name: 'oldPassword',
      text: '',
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Новый пароль',
      name: 'newPassword',
      text: '',
      type: 'password',
    },
    {
      isEdit: isEdit,
      label: 'Повторите Пароль',
      name: 'repeat_password',
      text: '',
      type: 'password',
    },
  ],
})
