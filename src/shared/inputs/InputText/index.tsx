import Component from '@/utils/Component'
import { EventBus } from '@/utils/EventBus'
import CompileMaster from '../../../core/CompileJSX'
import { EVENTS, InputTextEventBus } from './eventbus'
import styles from './styles.module.scss'

interface InputTextType {
  value?: string
  error?: string | null
  name?: string
  label?: string
  type?: 'password' | 'text' | 'number'
  focus?: boolean
  onChage?: (e: Event) => void
}

export default class InputText extends Component<InputTextType> {
  constructor(props: InputTextType) {
    props.error = ''
    props.value = ''

    super(props)
  }

  handlerChange(e: Event) {
    InputTextEventBus.emit(EVENTS.ONCHANGE(this.id), e)
  }

  onChange(e: Event) {
    let input = e.target as HTMLInputElement
    this.setProps({ value: input.value })
  }

  protected addEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.addEventListener('change', this.onChange.bind(this))
  }

  protected removeEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.removeEventListener('change', this.onChange.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <label
          for={this.props.name}
          class={`${this.props.focus ? 'hidden' : ''} ${styles.label}`}
          htmlFor={this.props.name}
        >
          {this.props.label}
        </label>
        <input
          value={this.props.value}
          id={this.id}
          name={this.props.name}
          type={this.props.type ? this.props.type : 'text'}
          class={styles.input}
        />
        <p class={`${this.props.error ? '' : 'hidden'}  ${styles.error}`}>
          {this.props.error ? this.props.error : ''}
        </p>
      </div>
    )
  }
}

// <p class={`${error ? 'hidden' : ''}  ${styles.error__message}`}>{error}</p>
