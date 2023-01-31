import CompileMaster from '../../core/CompileJSX'
import InputText from '@/shared/inputs/InputText'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import styles from './styles.module.scss'
import Component from '@/utils/Component'
import { StateSingIn, ValidateSingIn } from './constants'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'

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

const handle = () => alert('work')

export default class SingIn extends Component<SingInType> {
  constructor(props: SingInType) {
    props.modal = new ModalDefault({
      background: 'white',
      size: props.size,
      isOpen: true,
      onOut: () => {},
      children: new FormConstructorTitle({
        validate: ValidateSingIn,
        title: 'Вход',
        state: StateSingIn,
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
            events: { click: handle },
            view: 'primary',
          }),
          new ButtonConstructor({
            name: 'Зарегестрироваться',
            events: { click: handle },
            view: 'transparent',
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

/*
 {new FormConstructor({
              validate: {
                login: (value: string) => {
                  console.log(value)
                  return 'тут ошибка'
                },
                password: (value: string) => {
                  console.log(value)
                  return 'тут ошибка'
                },
              },
              title: 'Регистрация',
              state: {
                login: '',
                password: '',
              },
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
                  events: { click: handle },
                  view: 'primary',
                }),
                new ButtonConstructor({
                  name: 'Зарегестрироваться',
                  events: { click: handle },
                  view: 'transparent',
                }) || <div></div>,
              ],
            }).getContent()}
*/
