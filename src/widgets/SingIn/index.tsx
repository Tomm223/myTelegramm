import CompileMaster from '../../core/CompileJSX'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import { ValidateSingIn } from './constants'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import { useNavigate } from '@/core/routing'

interface SingInType {
  size: Size
  onSubmit: (form: Form) => void
  modal?: Component
}
interface Form {
  login: string
  password: string
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

const setLocation = (e: MouseEvent) => {
  e.preventDefault()
  useNavigate('/sing-up')
}

export default class SingIn extends Component<SingInType> {
  constructor(props: SingInType) {
    props.modal = new ModalDefault({
      background: 'white',
      size: props.size,
      isOpen: true,
      onOut: () => {},
      children: new FormConstructorTitle({
        onSubmit: (e) => console.log(e),
        validate: ValidateSingIn,
        title: 'Вход',
        inputs: [
          new InputText({
            name: 'login',
            label: 'Логин',
          }),
          new InputText({
            name: 'password',
            label: 'Пароль',
            type: 'password',
          }),
        ],
        buttons: [
          new ButtonConstructor({
            name: 'Войти',
            type: 'submit',
            view: 'primary',
          }),
          new ButtonConstructor({
            name: 'Зарегестрироваться',
            view: 'transparent',
            events: {
              click: setLocation,
            },
          }) || <div></div>,
        ],
      }),
    })
    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
