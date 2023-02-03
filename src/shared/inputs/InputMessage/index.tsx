import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import styles from './styles.module.scss'

interface InputMessageType {
  name?: string
  placeholder?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

export default class InputMessage extends Component<InputMessageType> {
  handleChange(e: Event) {
    let input = e.target as HTMLInputElement
    e.preventDefault()

    if (this.props.onChange) {
      this.props.onChange(input.value)
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('keyup', this.handleChange.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <input
        name={this.props.name}
        placeholder={this.props.placeholder}
        class={styles.input}
        type="text"
      />
    )
  }
}
