import CompileMaster from '@/core/CompileJSX'
import Component from '@/utils/Component'
import styles from './styles.module.scss'

interface InputProfileType {
  isEdit?: boolean
  name?: string
  label?: string
  text?: string
  type?: string
  error?: string
  style?: string
}

export default class InputProfile extends Component<InputProfileType> {
  protected addEvents(): void {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
  }

  protected removeEvents(): void {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.itemList}>
        <p class={styles.b}>{this.props.text}</p>
        <div class={styles.block}>
          <label class={styles.label} for={this.props.name}>
            {this.props.label}
          </label>
          <input
            id={this.id}
            class={styles.input}
            type={this.props.type}
            name={this.props.name}
            disabled={!this.props.isEdit}
            value={this.props.text}
          />
        </div>
        <div class={`${this.props.error ? '' : 'hidden'}  ${styles.error}`}>
          {this.props.error ? this.props.error : ''}
        </div>
      </div>
    )
  }
}
