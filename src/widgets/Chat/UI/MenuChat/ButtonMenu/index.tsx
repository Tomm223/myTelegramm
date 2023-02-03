import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import styles from './styles.module.scss'

interface ButtonMenuType {
  img?: string
  text?: string
  events?: Record<string, () => void>
}

export default class ButtonMenu extends Component<ButtonMenuType> {
  protected render(): HTMLElement {
    if (typeof this.props.img === 'string') {
      return (
        <button class={styles.btn}>
          <div class={styles.img}>
            <img src={this.props.img} alt="" />
          </div>
          <p class={styles.text}>{this.props.text}</p>
        </button>
      )
    }
    return (
      <button class={styles.btn}>
        <div class={styles.img}>{this.props.img}</div>
        <p class={styles.text}>{this.props.text}</p>
      </button>
    )
  }
}
