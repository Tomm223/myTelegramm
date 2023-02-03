import Avatar from '@/shared/Avatar'
import ButtonMore from '@/shared/buttons/ButtonMore'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'

interface HeaderType {
  img?: string
  title?: string
  isAddUserWindow?: boolean
  isRemoveUserWindow?: boolean
  menu?: Component
  isOpen?: boolean
  btn?: Component
}

export default class Header extends Component<HeaderType> {
  constructor(props: HeaderType) {
    props.isAddUserWindow = false
    props.isRemoveUserWindow = false
    props.isOpen = false

    super(props)
  }

  handlerVisible() {
    if (this.props.isOpen) {
      this.setProps({ isOpen: false })
    } else {
      this.setProps({ isOpen: true })
    }
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.header}>
        {Avatar({ link: this.props.img || '' })}
        <h3 class={styles.title}>{this.props.title}</h3>
        <div class={styles.btn}>
          {new ButtonMore({
            isActive: this.props.isOpen || false,
            events: { click: this.handlerVisible.bind(this) },
          }).getContent()}
        </div>
        <div class={this.props.isOpen ? styles.menu_active : styles.menu}>
          {this.childrenHTML.elements.menu}
        </div>
      </div>
    )
  }
}
