import LinkToBack from '@/shared/links/LinkToBack'
import CompileMaster from '@/core/CompileJSX'
import ProfileForm from '@/entities/ProfileForm'
import styles from './styles.module.scss'
import Component from '@/utils/Component'
import { ProfileEventBus, ProfileEVENTS } from './model'
import FormConstructor from '@/shared/form/FormConstructor'
import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import { PasswordForm, PersonForm, ProfileState, ProfileValidate } from './constants'
import InputProfile from '@/shared/inputs/InputProfile'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ButtonProfileNavigate from '@/shared/buttons/ButtonProfileNavigate'
import { EventBus } from '@/utils/EventBus'

interface ProfileType {
  isEdit?: boolean
  isEditAvatar?: boolean
  isPassword?: boolean
  inputs?: {
    label: string
    name: string
    text: string
    type: string
  }[]
  form?: {
    state?: StateForm
    validate?: ValidateForm
    inputs?: InputItem[]
  }
  buttons?: Component[]
}
type InputItem = { isEdit?: boolean; name?: string; label?: string; text?: string; type?: string }

export default class Profile extends Component<ProfileType> {
  constructor(props: ProfileType) {
    props.isEditAvatar = false
    props.isEdit = false

    super(props)
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ProfileEventBus.on(ProfileEVENTS.PERSON_NO_EDIT, this.inceptorPersonNoEdit.bind(this))
    ProfileEventBus.on(ProfileEVENTS.PERSON_EDIT, this.inceptorPersonEdit.bind(this))
    ProfileEventBus.on(ProfileEVENTS.PASSWORD_EDIT, this.inceptorPasswordEdit.bind(this))
    ProfileEventBus.on(ProfileEVENTS.EXIT, this.inceptorExit.bind(this))
  }

  inceptorPersonNoEdit() {
    this.children.buttons = this.getNavigateButtons()
    this.setProps({ isEdit: false, form: this.getInputsPerson() })
  }

  inceptorPersonEdit() {
    this.children.buttons = this.getEditButtons()
    this.setProps({ isEdit: true, form: this.getInputsPerson() })
  }

  inceptorPasswordEdit() {
    this.children.buttons = this.getEditButtons()
    this.setProps({ isEdit: true, form: this.getInputsPassword() })
  }

  inceptorExit() {
    alert('КУДА ВЫХОД')
    // this.setProps({ isEdit: true, form: this.getInputsPassword() })
  }

  protected init(): void {
    if (this.props.isEdit) {
      this.children.buttons = this.getEditButtons()
    } else this.children.buttons = this.getNavigateButtons()

    this.props.form = this.getInputsPerson()
  }

  getEditButtons(): Component[] {
    const btns: {
      name: string
      view: 'primary' | 'transparent'
      events: Record<string, (...args: any) => void>
    }[] = [
      {
        name: 'Сохранить',
        view: 'primary',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            ProfileEventBus.emit('form:submit')
          },
        },
      },
      {
        name: 'Не сохранять',
        view: 'transparent',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            ProfileEventBus.emit(ProfileEVENTS.PERSON_NO_EDIT)
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
        })
      }),
    ]
  }

  getNavigateButtons(): Component[] {
    const navbtn: {
      text: string
      view: 'primary' | 'red'
      onClick: (...args: any) => void
    }[] = [
      {
        text: 'Изменить данные',
        onClick: () => ProfileEventBus.emit(ProfileEVENTS.PERSON_EDIT),
        view: 'primary',
      },
      {
        text: 'Изменить пароль',
        onClick: () => ProfileEventBus.emit(ProfileEVENTS.PASSWORD_EDIT),
        view: 'primary',
      },
      {
        text: 'Выйти',
        onClick: () => ProfileEventBus.emit(ProfileEVENTS.EXIT),
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

  getInputsPerson() {
    return PersonForm(this.props.isEdit || false)
  }

  getInputsPassword() {
    return PasswordForm(this.props.isEdit || false)
  }

  protected render(): HTMLElement {
    console.log(this.props.form?.state)

    return (
      <div class={styles.container}>
        <div class={styles.link_back}>{LinkToBack({ href: '/' })}</div>
        <div class={styles.form}>
          {new FormConstructor({
            title: 'Редактировать Пользователя',
            ref: 'form',
            state: this.props.form?.state,
            validate: this.props.form?.validate,
            onSubmit: () => {},
            inputs: this.props.form?.inputs?.map((item) => {
              return new InputProfile({
                isEdit: this.props.isEdit || false,
                name: item.name,
                label: item.label,
                text: item.text,
                type: item.type,
              })
            }),
            buttons: Array.isArray(this.children.buttons)
              ? this.children.buttons
              : [this.children.buttons],
          }).getContent()}
        </div>
      </div>
    )
  }
}

/**
 *  {LoadFileModal({ isOpen: isAvatarWindow, size: { height: '260px' }, error: null })}
         <div class={styles.link_back}>
            {LinkToBack({ href: '/' })}
         </div>
         <div class={styles.form}>
            {ProfileForm({ isEdit, isPassword })}
         </div>
 */
