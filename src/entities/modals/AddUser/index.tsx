import ModalDefault from '@/shared/modals/ModalDefault'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import ModalFormDefault from '@/shared/modals/ModalFormDefault'
import { InputTextEventBus } from '@/shared/inputs/InputText/eventbus'

interface AddUserType {
  onSubmit?: (form: Record<string, string>) => void
  isOpen?: boolean
  size?: Size
  modal?: Component
  loading?: boolean
  error?: string
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class AddUser extends Component<AddUserType> {
  handleClose() {
    this.setProps({ isOpen: false })
  }

  protected init(): void {
    this.children.modal = new ModalDefault({
      background: 'dark',
      isOpen: !!this.props.isOpen,
      size: this.props.size,
      onOut: this.handleClose.bind(this),
      children: new FormConstructorTitle({
        disable: this.props.loading,
        error: this.props.error,
        title: 'Добавить Пользователя',
        inputs: [
          new InputText({
            name: 'add_name',
            label: 'ID пользователя',
            type: 'number',
          }),
        ],
        buttons: [
          new ButtonConstructor({
            name: 'Добавить',
            view: 'primary',
            type: 'submit',
          }),
        ],
        onSubmit: this.props.onSubmit,
      }),
    })
  }

  protected componentDidUpdate(oldProps: AddUserType, newProps: AddUserType): void {
    let modal = this.children.modal as Component
    if (oldProps.isOpen !== newProps.isOpen) {
      modal.setProps({ isOpen: newProps.isOpen })
    }
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
