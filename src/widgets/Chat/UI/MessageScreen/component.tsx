import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageScreenItem, { NotMessege } from './item'
import Component from '@/core/Component'
import Actions from '@/store/Actions'
import { messages } from './constants.reg'
import LoaderDefault from '@/shared/Loaders/LoaderDefault/defualt'
import Store from '@/store/Store'

interface MessageScreenType {
  messages?: Message[]
  loading?: boolean
  loader?: Component
}

export default class MessageScreen extends Component<MessageScreenType> {
  constructor(props: MessageScreenType) {
    props.loader = new LoaderDefault({
      width: '60px',
      borderWidth: '2px',
    })

    super(props)
  }

  dropDown() {
    if (!this._element?.getElementsByTagName('li').length) return

    let lastItem = [...this._element?.getElementsByTagName('li')].pop() as HTMLLIElement
    lastItem.scrollIntoView()
  }

  protected componentDidMount(): void {
    // Actions.startLoadingChatMessages()
    // setTimeout(() => {
    //   Actions.setChatMessages(messages)
    // }, 3000)
    this.dropDown()
  }

  protected componentDidUpdate(oldProps: MessageScreenType, newProps: MessageScreenType): void {
    this.dropDown()
  }

  protected render(): HTMLElement {
    let msgs
    // Actions.setChatMessages([])
    if (this.props.messages?.length) {
      msgs = this.props.messages.map((message) => MessageScreenItem({ message }))
    } else if (this.props.loading) {
      msgs = [this.childrenHTML.elements.loader]
    } else {
      msgs = [new NotMessege({}).getContent()]
    }

    return (
      <div class={styles.container}>
        <ul class={styles.list}>
          {...msgs}
          <li style="opacity:0;">zero</li>
        </ul>
      </div>
    )
  }
}
