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
import { SetPasswordRequest, UserType } from '@/types/user'
import { getStatePassword, getStatePerson } from './helpers'
import { UserController } from '@/service/user.service'
import { SingController } from '@/service/sing.service'

interface ProfileFormType {
  form?: Component
  user?: UserType
}

export default class ProfileForm extends Component<ProfileFormType> {
  get API() {
    const api = new UserController()
    const api2 = new SingController()
    return {
      async setProfile(user: UserType) {
        const status = await api.setProfile(user)
        if (status) {
          ProfileFormEventBus.emit(ProfileFormEVENTS.PERSON_NO_EDIT)
        }
      },
      async setPassword(data: SetPasswordRequest) {
        const status = await api.setPassword(data)
        if (status) {
          ProfileFormEventBus.emit(ProfileFormEVENTS.PERSON_NO_EDIT)
        }
      },
      async Logout() {
        const status = await api2.logout()
      },
    }
  }

  protected init(): void {
    if (this.props.user) {
      let initialState = getStatePerson(false, this.props.user, this.API.setProfile)
      this.children.form = new FormConstructor({
        ref: 'form',
        validate: initialState.validate,
        onSubmit: initialState.onSubmit,
        inputs: initialState.inputs,
        buttons: initialState.buttons,
      })
    }
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ProfileFormEventBus.on(ProfileFormEVENTS.PERSON_NO_EDIT, this.interceptorPerson.bind(this))
    ProfileFormEventBus.on(ProfileFormEVENTS.PERSON_EDIT, this.interceptorPersonEdit.bind(this))
    ProfileFormEventBus.on(ProfileFormEVENTS.PASSWORD_EDIT, this.interceptorPasswordEdit.bind(this))
    ProfileFormEventBus.on(ProfileFormEVENTS.EXIT, this.inceptorExit.bind(this))
  }

  interceptorPerson(isEdit = false) {
    if (!this.props.user) return

    let state = getStatePerson(isEdit, this.props.user, this.API.setProfile)
    let formik = this.children.form as FormConstructor

    formik.setProps({
      validate: state.validate,
      onSubmit: state.onSubmit,
      inputs: state.inputs,
      buttons: state.buttons,
    })
  }

  interceptorPersonEdit() {
    this.interceptorPerson(true)
  }

  interceptorPasswordEdit() {
    let state = getStatePassword(this.API.setPassword)
    let formik = this.children.form as FormConstructor

    formik.setProps({
      validate: state.validate,
      onSubmit: state.onSubmit,
      inputs: state.inputs,
      buttons: state.buttons,
    })
  }

  inceptorExit() {
    this.API.Logout()
  }

  protected render(): HTMLElement {
    return <div class={styles.block}>{this.childrenHTML.elements.form}</div>
  }
}
