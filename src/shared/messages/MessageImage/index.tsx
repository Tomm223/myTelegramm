import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Time from '@/components/Time/default'
import flagRead from '../components/FlagRead'

import IMG from '@/static/icons/avatar.jpg'

interface MessageImage {
  date: string
  img: string
  isMy: boolean
  isRead: boolean
}

export default function MessageImage({ date, img, isMy, isRead }: MessageImage) {
  return (
    <div class={styles.msg}>
      <img src={IMG} alt="Message image" class={styles.img} />
      <div class={styles.time}>
        <div class={isMy ? styles.flag : 'hidden'}>{flagRead({ isRead })}</div>
        {Time({ date, view: isMy ? 'blue' : 'white' })}
      </div>
    </div>
  )
}
