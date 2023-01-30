import CompileMaster from '../../core/CompileJSX'
import FormConstructor from '@/shared/form/FormConstructor'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import { StateSingUp, ValidateSingUp } from './constants'
import Component from '@/utils/Component'

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

function handle(e: Event) {
  e.preventDefault()
  alert('SSS')
}

export default class SingUp extends Component<SingUpType> {
  constructor(props: SingUpType) {
    props.modal = new ModalDefault({
      background: 'white',
      size: props.size,
      isOpen: true,
      onOut: () => {},
      children: new FormConstructor({
        ref: 'form',
        validate: ValidateSingUp,
        title: 'Регистрация',
        state: StateSingUp,
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
          }) || <div></div>,
          new ButtonConstructor({
            name: 'Войти',
            events: { click: handle },
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
