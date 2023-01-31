import Component from '@/utils/Component'
import CompileMaster from '@/core/CompileJSX'
import WindowDefault from '@/shared/modals/ModalDefault/components/WindowDefault'
import styles from './styles.module.scss'

interface MenuChatType {
  ref: string
  buttons: Component[]
}

export default class MenuChat extends Component<MenuChatType> {
  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        {new WindowDefault({
          style: 'padding:15px;',
          children: (
            <ul class={styles.list}>
              {...this.childrenHTML.lists.buttons.map((item) => {
                return <li class={styles.item}>{item}</li>
              })}
            </ul>
          ),
        }).getContent()}
      </div>
    )
  }
}
