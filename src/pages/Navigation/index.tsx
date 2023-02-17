import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import { useNavigate } from '@/core/routing'

export default class Nagivation extends Component {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    let tag = e.target as HTMLAnchorElement
    let pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
    useNavigate(pathname)
  }

  protected addEvents(): void {
    let links = this._element?.getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', this.handleHref.bind(this))
    }
  }

  protected removeEvents(): void {
    let links = this._element?.getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>
    for (let i = 0; i < links.length; i++) {
      links[i].removeEventListener('click', this.handleHref.bind(this))
    }
  }

  protected render(): HTMLElement {
    return (
      <nav class="nav_test">
        <div class="item_test">
          <a class="link_test" route="/profile">
            /Profile
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/sing-in">
            /SingUp
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/sing-up">
            /SingIn
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/messanger">
            /Messanger
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/no-found">
            /400
          </a>
        </div>
        <div class="item_test">
          <a class="link_test" route="/error">
            /500
          </a>
        </div>
      </nav>
    )
  }
}
