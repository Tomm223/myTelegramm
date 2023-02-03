import CompileMaster from '../../core/CompileJSX'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import { StateSingUp, ValidateSingUp } from './constants'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import FormConstructor from '@/shared/form/FormConstructor'
import { useNavigate } from '@/core/routing'

interface SingUpType {
  size: Size
  onSubmit: (form: Form) => void
  modal?: Component
}
interface Form {
  email: string
  login: string
  first_name: string
  second_name: string
  password: string
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

const setLocation = (e: MouseEvent) => {
  e.preventDefault()
  useNavigate('/sing-in')
}

export default class SingUp extends Component<SingUpType> {
  constructor(props: SingUpType) {
    props.modal = new ModalDefault({
      background: 'white',
      size: props.size,
      isOpen: true,
      onOut: () => {},
      children: new FormConstructorTitle({
        onSubmit: (e) => {
          console.log(e)
        },
        ref: 'form',
        validate: ValidateSingUp,
        title: 'Регистрация',
        inputs: [
          new InputText({ name: 'email', label: 'Почта' }),
          new InputText({ name: 'login', label: 'Логин' }),
          new InputText({ name: 'first_name', label: 'Имя' }),
          new InputText({ name: 'second_name', label: 'Фамилия' }),
          new InputText({ name: 'password', label: 'Пароль', type: 'password' }),
          new InputText({ name: 'phone', label: 'Телефон', type: 'number' }),
        ],
        buttons: [
          new ButtonConstructor({
            name: 'Зарегестрироваться',
            // events: { click: handle },
            view: 'primary',
            type: 'submit',
          }) || <div></div>,
          new ButtonConstructor({
            name: 'Войти',
            events: { click: setLocation },
            view: 'transparent',
          }),
        ],
      }),
    })

    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
