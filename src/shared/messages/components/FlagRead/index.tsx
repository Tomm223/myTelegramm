import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

import Read from '@/static/icons/read.svg'
import UnRead from '@/static/icons/unread.svg'

interface FlagReadType {
  isRead: boolean
}

export default function FlagRead({ isRead }: FlagReadType) {
  if (isRead) {
    return <img class={styles.img} src={Read} alt="" />
  }

  return <img class={styles.unimg} src={UnRead} alt="" />
}
