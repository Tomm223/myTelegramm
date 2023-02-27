import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Polygon1 from '@/static/icons/Polygon1.svg'
import Component from '@/core/Component'
<<<<<<< HEAD
import { useNavigate } from '@/core/routing'
=======
import Router from 'src/app/router'
>>>>>>> sprint_3

interface LinkToProfileType {
  onClick?: () => void
  href?: string
}

export default class LinkToProfile extends Component<LinkToProfileType> {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    let tag = e.currentTarget as HTMLAnchorElement
    let pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
<<<<<<< HEAD
    useNavigate(pathname)
=======
    Router.go(pathname)
>>>>>>> sprint_3
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
      <a class={styles.link_profile} route={this.props.href}>
        <p class={styles.link_profile__text}>Профиль</p>
        <img class={styles.link_profile__img} src={Polygon1} alt="" />
      </a>
    )
  }
}
