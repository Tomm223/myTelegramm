import ModalDefault from '@/shared/modals/ModalDefault'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import FormConstructor from '@/shared/form/FormConstructor'

interface ModalFormType {
  onSubmit?: (form: Record<string, string>) => void
  isOpen?: boolean
  size?: Size
  modal?: Component
  inputs?: Component[]
  title?: string
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class ModalFormDefault extends Component<ModalFormType> {
  handleClose() {
    this.setProps({ isOpen: false })
  }

  protected init(): void {
    let inputs = this.children.inputs as Component[]

    this.children.modal = new ModalDefault({
      background: 'dark',
      isOpen: !!this.props.isOpen,
      size: this.props.size,
      onOut: this.handleClose.bind(this),
      children: new FormConstructorTitle({
        title: this.props.title || '',
        inputs: inputs,
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

  protected componentDidUpdate(oldProps: ModalFormType, newProps: ModalFormType): void {
    let modal = this.children.modal as Component

    if (!newProps.isOpen) {
      const window = modal.children.window as Component
      const form = window.children.children as FormConstructorTitle
      const construct = form.children.constructo as FormConstructor
      construct.resetForm()
    }

    if (oldProps.isOpen !== newProps.isOpen) {
      modal.setProps({ isOpen: newProps.isOpen })
    }
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
