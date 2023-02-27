import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import WindowDefault from '@/shared/modals/ModalDefault/components/WindowDefault'
import styles from './styles.module.scss'

interface MenuChatType {
  ref: string
  buttons: Component[]
  window?: Component
}

export default class MenuChat extends Component<MenuChatType> {
  protected init(): void {
    if (!Array.isArray(this.children.buttons)) return
    let list = this.children.buttons.map((item: Component): HTMLElement => {
      let Instants = item.getContent()
      return <li class={styles.item}>{Instants}</li>
    })

    this.children.window = new WindowDefault({
      style: 'padding:15px;',
      children: <ul class={styles.list}>{...list}</ul>,
    })
  }

  protected render(): HTMLElement {
    return <div class={styles.block}>{this.childrenHTML.elements.window}</div>
  }
}
