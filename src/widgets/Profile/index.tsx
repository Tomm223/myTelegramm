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
  avatar?: Component
  avatar_modal?: Component
  formik?: Component
}
type InputItem = { isEdit?: boolean; name?: string; label?: string; text?: string; type?: string }

export default class Profile extends Component<ProfileType> {
  constructor(props: ProfileType) {
    props.isEditAvatar = false
    props.isEdit = false

    props.formik = new ProfileForm({})

    props.avatar = new AvatarForm({
      onClick: () => {
        this.setProps({ isEditAvatar: true })
      },
      img_src: Pics,
    })

    super(props)
  }

  protected init(): void {
    // this.children.avatar_modal = new LoadFileModal({
    //   isOpen: this.props.isEditAvatar || false,
    //   size: { height: '260px' },
    //   onClose: () => this.setProps({ isEditAvatar: false }),
    // })
  }

  protected render(): HTMLElement {
    return (
      <div>
        <div class={styles.form}>
          <div class={styles.form__item}>{this.childrenHTML.elements.avatar}</div>
          {this.childrenHTML.elements.formik}
        </div>
        {/* {this.childrenHTML.elements.avatar_modal} */}
        {new LoadFileModal({
          isOpen: this.props.isEditAvatar || false,
          size: { height: '260px' },
          onClose: () => this.setProps({ isEditAvatar: false }),
        }).getContent()}
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
