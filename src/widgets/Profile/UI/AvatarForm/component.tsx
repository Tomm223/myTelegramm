import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import Pics from '@/static/icons/pics_profile.png'
import { API_BASE_RESOURCES } from '@/http/index'

interface AvatarFormType {
  onClick: () => void
  img_src?: string
  avatar: string | null
  first_name: string
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
          <img
            src={this.props.avatar ? API_BASE_RESOURCES + this.props.avatar : Pics}
            alt="setAvatar"
          />
          <button class={styles.avatar__hover}>Поменять аватар</button>
        </div>
        <h3 class={styles.avatar__name}>{this.props.first_name || 'User'}</h3>
      </div>
    )
  }
}
