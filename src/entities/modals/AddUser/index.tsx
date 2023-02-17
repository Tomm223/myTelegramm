import ModalDefault from '@/shared/modals/ModalDefault'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'

interface AddUserType {
  onClose: () => void
  onSubmit: (form: Record<string, string>) => void
  isOpen: boolean
  size: Size
  modal?: Component
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class AddUser extends Component<AddUserType> {
  protected render(): HTMLElement {
    return (
      <div>
        {/* {this.childrenHTML.elements.modal} */}
        {new ModalDefault({
          background: 'dark',
          isOpen: this.props.isOpen,
          size: this.props.size,
          onOut: this.props.onClose,
          children: new FormConstructorTitle({
            title: 'Добавить Пользователя',
            inputs: [
              new InputText({
                name: 'add_name',
                label: 'Имя',
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
        }).getContent()}
      </div>
    )
  }
}
