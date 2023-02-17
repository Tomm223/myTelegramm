import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Time from '@/shared/Time/default'
import flagRead from '../../components/FlagRead'

interface MyMessage {
  text: string
  date: string
  isRead: boolean
}

export default function MyMessage({ date, text, isRead }: MyMessage) {
  return (
    <div class={styles.msg_my}>
      <p class={styles.msg_my__text}>{text}</p>
      <div class={styles.msg_my__time}>
        <div class={isRead ? styles.msg_my__flag_read : styles.msg_my__flag_unread}>
          {flagRead({ isRead })}
        </div>
        {Time({ date: date, view: 'blue' })}
      </div>
    </div>
  )
}
