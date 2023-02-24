import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import PlusGray from '@/static/icons/plus_gray.svg'

interface ItemCreate {
  onClick: () => void
}

export default class ItemCreateChat extends Component<ItemCreate> {
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
        <div class={styles.content}>
          <img class={styles.img} src={PlusGray} alt="" />
          Создать Чат
        </div>
      </button>
    )
  }
}
