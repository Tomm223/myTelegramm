import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import { ValidatesForm } from '@/shared/form/FormConstructor/validates.reg'
<<<<<<< HEAD
=======
import { UserType } from '@/types/user'
>>>>>>> sprint_3

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

<<<<<<< HEAD
export const PersonForm = (isEdit: boolean) => ({
  state: ProfileState.data,
  validate: ProfileValidate.data, //{ ...ProfileValidate.data, ...ProfileValidate.password },
=======
export const PersonForm = (isEdit: boolean, user: UserType) => ({
  state: ProfileState.data,
  validate: ProfileValidate.data,
>>>>>>> sprint_3
  inputs: [
    {
      isEdit: isEdit,
      label: 'Почта',
      name: 'email',
<<<<<<< HEAD
      text: 'katenkadem1denko@yandex.ru',
      type: 'text',
    },
    { isEdit: isEdit, label: 'Логин', name: 'login', text: 'Dancsgo', type: 'text' },
=======
      text: user.email,
      type: 'text',
    },
    { isEdit: isEdit, label: 'Логин', name: 'login', text: user.login, type: 'text' },
>>>>>>> sprint_3
    {
      isEdit: isEdit,
      label: 'Имя',
      name: 'first_name',
<<<<<<< HEAD
      text: 'Daniil',
=======
      text: user.first_name,
>>>>>>> sprint_3
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Фамилия',
      name: 'second_name',
<<<<<<< HEAD
      text: 'Osipov',
=======
      text: user.second_name,
>>>>>>> sprint_3
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Имя в чате',
<<<<<<< HEAD
      name: 'name',
      text: 'Dannial`',
=======
      name: 'display_name',
      text: user.display_name,
>>>>>>> sprint_3
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Телефон',
      name: 'phone',
<<<<<<< HEAD
      text: '89534545',
=======
      text: user.phone,
>>>>>>> sprint_3
      type: 'number',
    },
  ],
})

export const PasswordForm = (isEdit: boolean) => ({
  state: ProfileState.password,
<<<<<<< HEAD
  validate: ProfileValidate.password, //{ ...ProfileValidate.data, ...ProfileValidate.password },
=======
  validate: ProfileValidate.password,
>>>>>>> sprint_3
  inputs: [
    {
      isEdit: isEdit,
      label: 'Старый пароль',
<<<<<<< HEAD
      name: 'old_password',
      text: 'Osipov',
=======
      name: 'oldPassword',
      text: '',
>>>>>>> sprint_3
      type: 'text',
    },
    {
      isEdit: isEdit,
      label: 'Новый пароль',
<<<<<<< HEAD
      name: 'password',
      text: 'Dannial`',
=======
      name: 'newPassword',
      text: '',
>>>>>>> sprint_3
      type: 'password',
    },
    {
      isEdit: isEdit,
      label: 'Повторите Пароль',
      name: 'repeat_password',
<<<<<<< HEAD
      text: 'Dannial',
=======
      text: '',
>>>>>>> sprint_3
      type: 'password',
    },
  ],
})
