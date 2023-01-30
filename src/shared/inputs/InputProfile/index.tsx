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
}

export default class InputProfile extends Component<InputProfileType> {
  protected render(): HTMLElement {
    return (
      <div class={styles.itemList}>
        <div class={styles.block}>
          <label class={styles.label} for={this.props.name}>
            {this.props.label}
          </label>
          <input
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
