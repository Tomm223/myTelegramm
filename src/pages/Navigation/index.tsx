import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
<<<<<<< HEAD
import { useNavigate } from '@/core/routing'
=======
import Router from 'src/app/router'
>>>>>>> sprint_3

export default class Nagivation extends Component {
  handleHref(e: MouseEvent) {
    e.preventDefault()
    let tag = e.target as HTMLAnchorElement
    let pathname = tag.getAttribute('route') as string | null

    if (!pathname) return
<<<<<<< HEAD
    useNavigate(pathname)
=======
    Router.go(pathname)
>>>>>>> sprint_3
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
<<<<<<< HEAD
          <a class="link_test" route="/profile">
=======
          <a class="link_test" route="/setting">
>>>>>>> sprint_3
            /Profile
          </a>
        </div>
        <div class="item_test">
<<<<<<< HEAD
          <a class="link_test" route="/sing-in">
=======
          <a class="link_test" route="/sing-up">
>>>>>>> sprint_3
            /SingUp
          </a>
        </div>
        <div class="item_test">
<<<<<<< HEAD
          <a class="link_test" route="/sing-up">
=======
          <a class="link_test" route="/sing-in">
>>>>>>> sprint_3
            /SingIn
          </a>
        </div>
        <div class="item_test">
<<<<<<< HEAD
          <a class="link_test" route="/messanger">
=======
          <a class="link_test" route="/messenger">
>>>>>>> sprint_3
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
