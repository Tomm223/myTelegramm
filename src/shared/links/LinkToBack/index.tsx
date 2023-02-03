import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Arrow from '@/static/icons/arrow-circle.svg'
import Component from '@/core/Component'
import { useNavigate } from '@/core/routing'

interface LinkToBackType {
  onClick?: () => void
  href: string
}

export default class LinkToBack extends Component<LinkToBackType> {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    let tag = e.currentTarget as HTMLAnchorElement
    let pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
    useNavigate(pathname)
  }

  protected addEvents(): void {
    let link = this._element as HTMLAnchorElement

    link.addEventListener('click', this.handleHref.bind(this))
  }

  protected removeEvents(): void {
    let link = this._element as HTMLAnchorElement
    link.removeEventListener('click', this.handleHref.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <a class={styles.link} route={this.props.href}>
        <img class={styles.img} src={Arrow} alt="" />
      </a>
    )
  }
}
