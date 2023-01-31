import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Chat from '@/widgets/Chat'
import ChatNav from '@/widgets/ChatsNav'
import AddUser from '@/entities/modals/AddUser'
import RemoveUser from '@/entities/modals/RemoveUser'
import Component from '@/utils/Component'

interface MessangerType {
  nav?: Component
  chat?: Component
}

export default class Messanger extends Component<MessangerType> {
  constructor(props: MessangerType) {
    props.nav = new ChatNav({})
    props.chat = new Chat({})

    super(props)
  }

  protected componentDidMount(): void {
    console.log('did')
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.main}>
        <div class={styles.container}>
          {this.childrenHTML.elements.nav}
          {this.childrenHTML.elements.chat}
          {/* {new Chat({}).getContent()} */}
        </div>
      </div>
    )
  }
}
