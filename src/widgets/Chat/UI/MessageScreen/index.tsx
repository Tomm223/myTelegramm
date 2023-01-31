import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageScreenItem from './item'
import Component from '@/utils/Component'

interface MessageScreenType {
  messages: Message[]
}
/*
setTimeout(() => {
         itemEnd.current?.scrollIntoView({
            //behavior: 'smooth'
         })
      }, 300)
      itemEnd.current?.scrollIntoView({
         behavior: 'smooth'
      })
*/

export default class MessageScreen extends Component<MessageScreenType> {
  protected componentDidMount(): void {
    console.log('end')

    if (!this._element?.getElementsByTagName('li').length) return

    let lastItem = [...this._element?.getElementsByTagName('li')].pop() as HTMLLIElement
    lastItem.scrollIntoView()
    console.log('end')
  }

  protected render(): HTMLElement {
    const newMessage: Message[] = []

    for (let i = 0; i < 25; i++) {
      const date = '2020-01-02T14:22:22.000Z'
      let text = `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в 
    какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы 
    все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все 
    еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.`

      const message: Message = {
        content: text,
        time: date,
        user: {
          avatar: '',
          email: '',
          first_name: '',
          login: '',
          phone: '',
          second_name: '',
        },
      }
      if (i === 24) message.content = 'Привет!'
      newMessage.push(MessageScreenItem({ message }))
    }

    return (
      <div class={styles.container}>
        <ul class={styles.list}>
          {...newMessage}
          <li style="opacity:0;">zero</li>
        </ul>
      </div>
    )
  }
}
