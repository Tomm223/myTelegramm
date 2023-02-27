<<<<<<< HEAD
import CompileMaster from '@/core/CompileJSX'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ButtonProfileNavigate from '@/shared/buttons/ButtonProfileNavigate'
import FormConstructor from '@/shared/form/FormConstructor'
import InputProfile from '@/shared/inputs/InputProfile'
import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import { PasswordForm, PersonForm } from './constants'
import { ProfileFormEventBus, ProfileFormEVENTS } from './eventbus'
import styles from './styles.module.scss'

interface ProfileFormType {
  form?: Component
}

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

function getStatePerson(isEdit: boolean) {
  let state = PersonForm(isEdit)
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
  let onSubmit = (data: Record<string, string>) => {
    console.log(data)
  }
  return { ...state, inputs, buttons, onSubmit }
}

function getStatePassword() {
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
  let onSubmit = (form: Record<string, string>) => {
    console.log(form)
  }
  return { ...state, inputs, buttons, onSubmit }
}

export default class ProfileForm extends Component<ProfileFormType> {
  constructor(props: ProfileFormType) {
    let initialState = getStatePerson(false)
    props.form = new FormConstructor({
      ref: 'form',
      validate: initialState.validate,
      onSubmit: initialState.onSubmit,
      inputs: initialState.inputs,
      buttons: initialState.buttons,
    })

    super(props)
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ProfileFormEventBus.on(
      ProfileFormEVENTS.PERSON_NO_EDIT,
      this.interceptorPersonNoEdit.bind(this)
    )
    ProfileFormEventBus.on(ProfileFormEVENTS.PERSON_EDIT, this.interceptorPersonEdit.bind(this))
    ProfileFormEventBus.on(ProfileFormEVENTS.PASSWORD_EDIT, this.interceptorPasswordEdit.bind(this))
    ProfileFormEventBus.on(ProfileFormEVENTS.EXIT, this.inceptorExit.bind(this))
  }

  interceptorPersonNoEdit() {
    let state = getStatePerson(false)
    let formik = this.children.form as FormConstructor

    formik.setProps({
      validate: state.validate,
      onSubmit: state.onSubmit,
      inputs: state.inputs,
      buttons: state.buttons,
    })
  }

  interceptorPersonEdit() {
    let state = getStatePerson(true)
    let formik = this.children.form as FormConstructor

    formik.setProps({
      validate: state.validate,
      onSubmit: state.onSubmit,
      inputs: state.inputs,
      buttons: state.buttons,
    })
  }

  interceptorPasswordEdit() {
    let state = getStatePassword()
    let formik = this.children.form as FormConstructor

    formik.setProps({
      validate: state.validate,
      onSubmit: state.onSubmit,
      inputs: state.inputs,
      buttons: state.buttons,
    })
  }

  inceptorExit() {
    alert('КУДА ВЫХОД')
  }

  protected render(): HTMLElement {
    return <div class={styles.block}>{this.childrenHTML.elements.form}</div>
  }
}
=======
import { connect } from '@/store/connect'
import ProfileForm from './component'

function map(state: any) {
  return {
    user: state.user,
  }
}

export default connect(ProfileForm, map)
>>>>>>> sprint_3
