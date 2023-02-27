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
    })

    super(props)
  }

  handleShowModal() {
    let modal = this.children.avatar_modal
    if (Array.isArray(modal)) return

    modal.setProps({ isOpen: !modal.props.isOpen })
  }

  protected init(): void {
    console.log('tyt error if not next log')

    this.children.avatar = new AvatarForm({
      onClick: this.handleShowModal.bind(this),
    })
    console.log('not tyt error')
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
