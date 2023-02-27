import CompileMaster from '@/core/CompileJSX'
import { Message } from '@/types/chats'
import styles from './styles.module.scss'
import MessageText from '@/shared/messages/MessageText'
import MessageImage from '@/shared/messages/MessageImage'
<<<<<<< HEAD
=======
import Component from '@/core/Component'
import Actions from '@/store/Actions'
>>>>>>> sprint_3

interface MessageScreenItem {
  message: Message
}

<<<<<<< HEAD
export default function MessageScreenItem({ message }: MessageScreenItem) {
  const { content, time, user } = message

  const isTextFormat = true
  const isMy = Math.random() * 10 < 5 ? true : false
  const isRead = Math.random() * 10 < 5 ? true : false
=======
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
  const { content, time, user_id: userID, is_read: isRead } = message

  const myID = Actions.getUser()?.id
  const isMy = myID === userID
  const isTextFormat = true
>>>>>>> sprint_3

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
