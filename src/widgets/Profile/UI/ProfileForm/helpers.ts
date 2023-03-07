import Component from '@/core/Component'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ButtonProfileNavigate from '@/shared/buttons/ButtonProfileNavigate'
import InputProfile from '@/shared/inputs/InputProfile'
import { UserType } from '@/types/user'
import { PasswordForm, PersonForm } from './constants'
import { ProfileFormEventBus, ProfileFormEVENTS } from './eventbus'

function getEditButtons(): Component[] {
  const btns: {
    type?: string
    name: string
    view: 'primary' | 'transparent'
    events: Record<string, (...args: any) => void>
  }[] = [
    {
      type: 'submit',
      name: 'Сохранить',
      view: 'primary',
      events: {},
    },
    {
      name: 'Не сохранять',
      view: 'transparent',
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault()
          ProfileFormEventBus.emit(ProfileFormEVENTS.PERSON_NO_EDIT)
        },
      },
    },
  ]

  return [
    ...btns.map((item) => {
      return new ButtonConstructor({
        name: item.name,
        view: item.view,
        events: item.events,
        type: item.type,
      })
    }),
  ]
}

function getNavigateButtons(): Component[] {
  const navbtn: {
    text: string
    view: 'primary' | 'red'
    onClick: (...args: any) => void
  }[] = [
    {
      text: 'Изменить данные',
      onClick: () => ProfileFormEventBus.emit(ProfileFormEVENTS.PERSON_EDIT),
      view: 'primary',
    },
    {
      text: 'Изменить пароль',
      onClick: () => ProfileFormEventBus.emit(ProfileFormEVENTS.PASSWORD_EDIT),
      view: 'primary',
    },
    {
      text: 'Выйти',
      onClick: () => ProfileFormEventBus.emit(ProfileFormEVENTS.EXIT),
      view: 'red',
    },
  ]

  return [
    ...navbtn.map((item) => {
      return new ButtonProfileNavigate({
        text: item.text,
        view: item.view,
        onClick: item.onClick,
      })
    }),
  ]
}

export function getStatePerson(
  isEdit: boolean,
  user: UserType,
  onSubmit: any //(data: Record<string, any>) => void
) {
  let state = PersonForm(isEdit, user)
  let inputs = state.inputs.map((item) => {
    return new InputProfile({
      isEdit: isEdit,
      name: item.name,
      label: item.label,
      text: item.text,
      type: item.type,
    })
  })
  let buttons = isEdit ? getEditButtons() : getNavigateButtons()

  return { ...state, inputs, buttons, onSubmit }
}

export function getStatePassword(onSubmit: any) {
  const isEdit = true

  let state = PasswordForm(isEdit)
  let inputs = state.inputs.map((item) => {
    return new InputProfile({
      isEdit: isEdit,
      name: item.name,
      label: item.label,
      text: item.text,
      type: item.type,
    })
  })
  let buttons = getEditButtons()

  return { ...state, inputs, buttons, onSubmit }
}
