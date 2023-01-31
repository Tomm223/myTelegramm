import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/utils/Component'

interface AvatarFormType {
  onClick: () => void
  img_src?: string
}

export default class AvatarForm extends Component<AvatarFormType> {
  handler(e: MouseEvent) {
    e.preventDefault()
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  protected addEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement

    btn.addEventListener('click', this.handler.bind(this))
  }

  protected removeEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement

    btn.removeEventListener('click', this.handler.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.avatar}>
        <div class={styles.avatar__img}>
          <img src={this.props.img_src} alt="setAvatar" />
          <button class={styles.avatar__hover}>Поменять аватар</button>
        </div>
        <h3 class={styles.avatar__name}>Даниил</h3>
      </div>
    )
  }
}
