import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import ButtonLoadFile from '@/shared/buttons/ButtonLoadFile'
import { AcceptInputChoose } from '@/shared/inputs/InputFile'

interface LoadFileModalType {
  isOpen?: boolean
  size?: Size
  modal?: Component
  inputName?: string
  accepting?: AcceptInputChoose
  onSubmit?: (form: any) => void
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class LoadFileModal extends Component<LoadFileModalType> {
  handleClose() {
    this.setProps({ isOpen: false })
  }

  protected init(): void {
    this.children.modal = new ModalDefault({
      background: 'dark',
      isOpen: !!this.props.isOpen,
      onOut: this.handleClose.bind(this),
      size: this.props.size,
      children: new FormConstructorTitle({
        setting: 'files',
        onSubmit: this.props.onSubmit,
        title: 'Загрузить Файл',
        inputs: [
          new ButtonLoadFile({
            name: this.props.inputName || 'Выберите файл',
            accepting: this.props.accepting || 'files',
          }),
        ],
        validate: {},
        buttons: [
          new ButtonConstructor({
            type: 'submit',
            name: 'Загрузить',
            view: 'primary',
            events: {
              click: () => {},
            },
          }),
        ],
      }),
    })
  }

  protected componentDidUpdate(oldProps: LoadFileModalType, newProps: LoadFileModalType): void {
    let modal = this.children.modal as Component
    if (oldProps.isOpen !== newProps.isOpen) {
      modal.setProps({ isOpen: newProps.isOpen })
    }
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
