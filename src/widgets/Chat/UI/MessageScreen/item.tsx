import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageText from '@/shared/messages/MessageText'
import MessageImage from '@/shared/messages/MessageImage'

interface MessageScreenItem {
  message: Message
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
