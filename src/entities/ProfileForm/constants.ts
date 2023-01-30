export const inputsChange: {
  password: {
    label: string
    name: string
    text: string
    type: string
  }[]
  profile: {
    label: string
    name: string
    text: string
    type: string
  }[]
} = {
  password: [
    {
      label: 'Старый пароль',
      name: 'email',
      text: 'd@mail.ru',
      type: 'password',
    },
    {
      label: 'Новый пароль',
      name: 'login',
      text: 'danOsip',
      type: 'password',
    },
    {
      label: 'Повторите новый пароль',
      name: 'first_name',
      text: 'Daniil',
      type: 'password',
    },
  ],
  profile: [
    { label: 'Почта', name: 'email', text: 'd@mail.ru', type: 'text' },
    { label: 'Логин', name: 'login', text: 'danOsip', type: 'text' },
    { label: 'Имя', name: 'first_name', text: 'Daniil', type: 'text' },
    { label: 'Фамилия', name: 'second_name', text: 'Osipov', type: 'text' },
    { label: 'Имя в чате', name: 'display_name', text: 'Dan', type: 'text' },
    { label: 'Телефон', name: 'phone', text: '89539005656', type: 'text' },
  ],
}
