<<<<<<< HEAD
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
=======
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import { StateForm, ValidateForm } from '@/shared/form/FormConstructor/types'
import AvatarForm from './UI/AvatarForm'
import LoadFileModal from '@/entities/modals/LoadFileModal'
import ProfileForm from './UI/ProfileForm/'
import { UserController } from '@/service/user.service'

interface ProfileType {
  isEdit?: boolean
>>>>>>> sprint_3
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
<<<<<<< HEAD
    props.isEditAvatar = false
    props.isEdit = false

    props.formik = new ProfileForm({})

    props.avatar = new AvatarForm({
      onClick: () => {
        this.setProps({ isEditAvatar: true })
      },
      img_src: Pics,
=======
    props.isEdit = typeof props.isEdit === 'boolean' ? props.isEdit : false

    props.formik = new ProfileForm({})

    const api = new UserController()
    props.avatar_modal = new LoadFileModal({
      inputName: 'avatar',
      accepting: 'images',
      isOpen: false,
      size: { height: '260px' },
      onSubmit: async (form: any) => {
        const formData = new FormData()
        const fileList = form.avatar as FileList
        const img = fileList[0]
        formData.append('avatar', img, img.name)

        const status = await api.setAvatar(formData)
        if (status) {
          this.handleShowModal()
        }
      },
>>>>>>> sprint_3
    })

    super(props)
  }

<<<<<<< HEAD
  protected init(): void {
    // this.children.avatar_modal = new LoadFileModal({
    //   isOpen: this.props.isEditAvatar || false,
    //   size: { height: '260px' },
    //   onClose: () => this.setProps({ isEditAvatar: false }),
    // })
=======
  handleShowModal() {
    let modal = this.children.avatar_modal
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
  }

  protected init(): void {
    this.children.avatar = new AvatarForm({
      onClick: this.handleShowModal.bind(this),
    })
>>>>>>> sprint_3
  }

  protected render(): HTMLElement {
    return (
      <div>
        <div class={styles.form}>
          <div class={styles.form__item}>{this.childrenHTML.elements.avatar}</div>
          {this.childrenHTML.elements.formik}
        </div>
<<<<<<< HEAD
        {/* {this.childrenHTML.elements.avatar_modal} */}
        {new LoadFileModal({
          isOpen: this.props.isEditAvatar || false,
          size: { height: '260px' },
          onClose: () => this.setProps({ isEditAvatar: false }),
        }).getContent()}
=======
        {this.childrenHTML.elements.avatar_modal}
>>>>>>> sprint_3
      </div>
    )
  }
}
<<<<<<< HEAD

/**
 *  {LoadFileModal({ isOpen: isAvatarWindow, size: { height: '260px' }, error: null })}
         <div class={styles.link_back}>
            {LinkToBack({ href: '/' })}
         </div>
         <div class={styles.form}>
            {ProfileForm({ isEdit, isPassword })}
         </div>
 */
=======
>>>>>>> sprint_3
