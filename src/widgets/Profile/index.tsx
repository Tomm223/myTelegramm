import LinkToBack from '@/shared/links/LinkToBack'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import FormConstructor from '@/shared/form/FormConstructor'
import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import { PasswordForm, PersonForm, ProfileState, ProfileValidate } from './constants'
import InputProfile from '@/shared/inputs/InputProfile'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ButtonProfileNavigate from '@/shared/buttons/ButtonProfileNavigate'
import { EventBus } from '@/core/EventBus'
import AvatarForm from './UI/AvatarForm'
import Pics from '@/static/icons/pics_profile.png'
import LoadFileModal from '@/entities/modals/LoadFileModal'
import ProfileForm from './UI/ProfileForm'

interface ProfileType {
  isEdit?: boolean
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
  avatar?: Component
  avatar_modal?: Component
  formik?: Component
}
type InputItem = { isEdit?: boolean; name?: string; label?: string; text?: string; type?: string }

export default class Profile extends Component<ProfileType> {
  constructor(props: ProfileType) {
    props.isEdit = typeof props.isEdit === 'boolean' ? props.isEdit : false

    props.formik = new ProfileForm({})

    props.avatar_modal = new LoadFileModal({
      inputName: 'avatar',
      accepting: 'images',
      isOpen: false,
      size: { height: '260px' },
    })

    super(props)
  }

  handleShowModal() {
    let modal = this.children.avatar_modal
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
    console.log(modal.props)
  }

  protected init(): void {
    this.children.avatar = new AvatarForm({
      onClick: this.handleShowModal.bind(this),
      img_src: Pics,
    })
  }

  protected render(): HTMLElement {
    return (
      <div>
        <div class={styles.form}>
          <div class={styles.form__item}>{this.childrenHTML.elements.avatar}</div>
          {this.childrenHTML.elements.formik}
        </div>
        {this.childrenHTML.elements.avatar_modal}
      </div>
    )
  }
}
