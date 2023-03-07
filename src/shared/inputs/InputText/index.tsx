import Component from '@/core/Component'
import { deepEqual } from '@/core/deepEqual'
import { EventBus } from '@/core/EventBus'
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
    props.focus = false

    super(props)
  }

  handlerChange(e: Event) {
    InputTextEventBus.emit(EVENTS.ONCHANGE(this.id), e)
  }

  onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.setProps({ value: input.value })
  }

  protected addEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.addEventListener('change', this.onChange.bind(this))
    input.addEventListener('blur', this.saveFocus.bind(this))
  }

  protected removeEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.removeEventListener('change', this.onChange.bind(this))
    input.removeEventListener('blur', this.saveFocus.bind(this))
  }

  saveFocus() {
    const input = this._element?.querySelector('.' + styles.input) as HTMLInputElement

    if (document.activeElement === input) {
      this.props.focus = true
    } else {
      this.props.focus = false
    }
  }

  protected shouldComponentUpdate(oldProps: InputTextType, newProps: InputTextType): boolean {
    const shoudUpdate = !deepEqual(oldProps, newProps)
    this.saveFocus()

    return shoudUpdate
  }

  protected render(): HTMLElement {
    // console.log('focus', this.props.focus, this.props.value)

    return (
      <div class={styles.block}>
        <label for={this.props.name} class={styles.label} htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <input
          value={this.props.value}
          id={this.id}
          name={this.props.name}
          type={this.props.type ? this.props.type : 'text'}
          class={styles.input}
          focus={this.props.focus}
        />
        <p class={`${this.props.error ? '' : 'hidden'}  ${styles.error}`}>
          {this.props.error ? this.props.error : ''}
        </p>
      </div>
    )
  }
}

// <p class={`${error ? 'hidden' : ''}  ${styles.error__message}`}>{error}</p>
