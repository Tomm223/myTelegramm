import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'

import Read from '@/static/icons/read.svg'
import UnRead from '@/static/icons/unread.svg'

interface flagRead {
   isRead: boolean
}

export default function flagRead({ isRead }: flagRead) {

   if (isRead) {
      return <img class={styles.img} src={Read} alt="" />
   }

   return <img class={styles.unimg} src={UnRead} alt="" />
}

