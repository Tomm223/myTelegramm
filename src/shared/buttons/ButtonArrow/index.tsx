import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Arrow from '@/static/icons/arrow-circle.svg'
import Component from '@/utils/Component'

interface ButtonArrowType {
  onClick?: () => void | undefined
}

export default class ButtonArrow extends Component<ButtonArrowType> {
  handleClick(e: MouseEvent) {
    e.preventDefault()
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <button class={styles.btn}>
        <img class={styles.img} src={Arrow} alt="Arrow" />
      </button>
    )
  }
}
