import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import { ValidatesForm } from '@/shared/form/FormConstructor/validates'

export const ProfileState: { data: StateForm; password: StateForm } = {
  data: {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    name: '',
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
    name: ValidatesForm.first_name,
    second_name: ValidatesForm.second_name,
    phone: ValidatesForm.phone,
  },
  password: {
    old_password: ValidatesForm.password,
    password: ValidatesForm.password,
    repeat_password: ValidatesForm.password,
  },
}

export const PersonForm = (isEdit: boolean) => ({
  state: ProfileState.data,
  validate: ProfileValidate.data,
  inputs: [
    {
      isEdit: isEdit,
      label: 'Почта',
      name: 'email',
      text: 'katenkadem1denko@yandex.ru',
      type: 'text',
    },
    { isEdit: isEdit, label: 'Логин', name: 'login', text: 'Dancsgo', type: 'text' },
    {
      isEdit: isEdit,
      label: 'Имя',
      name: 'first_name',
      text: 'Daniil',
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Фамилия',
      name: 'second_name',
      text: 'Osipov',
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Имя в чате',
      name: 'name',
      text: 'Dannial`',
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Телефон',
      name: 'phone',
      text: '89534545',
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
      name: 'old_password',
      text: 'Osipov',
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Новый пароль',
      name: 'password',
      text: 'Dannial`',
      type: 'password',
    },
    {
      isEdit: isEdit,
      label: 'Повторите Пароль',
      name: 'repeat_password',
      text: 'Dannial',
      type: 'password',
    },
  ],
})
