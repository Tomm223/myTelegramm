import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageText from '@/shared/messages/MessageText'
import MessageImage from '@/shared/messages/MessageImage'
import Component from '@/core/Component'

interface MessageScreenItem {
  message: Message
}

export class NotMessege extends Component {
  protected render(): HTMLElement {
    return (
      <div class={styles.not}>
        <span class={styles.not__text}>
          У вас пока нет Сообщений, начните общение прямо сейчас!
        </span>
      </div>
    )
  }
}

export default function MessageScreenItem({ message }: MessageScreenItem) {
  const { content, time, user } = message

  const isTextFormat = true
  const isMy = Math.random() * 10 < 5 ? true : false
  const isRead = Math.random() * 10 < 5 ? true : false

  if (!isTextFormat) {
    return 'MessageImage'
  }

  return (
    <li class={isMy ? styles.my : styles.your}>
      <div class={styles.msg_container}>
        {MessageText({ date: time, isMy, isRead, text: content })}
      </div>
    </li>
  )
}
