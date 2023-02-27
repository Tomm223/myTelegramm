import ModalDefault from '@/shared/modals/ModalDefault'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'

interface RemoveUserType {
  onSubmit?: (form: Record<string, string>) => void
  isOpen?: boolean
  size?: Size
  modal?: Component
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class RemoveUser extends Component<RemoveUserType> {
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
        title: 'Удалить Пользователя',
        inputs: [
          new InputText({
            name: 'remove_name',
            error: null,
            label: 'ID пользователя',
            type: 'number',
          }),
        ],
        buttons: [
          new ButtonConstructor({
            name: 'Удалить',
            view: 'primary',
            type: 'submit',
          }),
        ],
        onSubmit: this.props.onSubmit,
      }),
    })
  }

  protected componentDidUpdate(oldProps: RemoveUserType, newProps: RemoveUserType): void {
    let modal = this.children.modal as Component
    if (oldProps.isOpen !== newProps.isOpen) {
      modal.setProps({ isOpen: newProps.isOpen })
    }
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
