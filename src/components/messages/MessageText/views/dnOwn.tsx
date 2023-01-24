import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Time from '@/components/Time/default'
import flagRead from "../../components/FlagRead";


interface DnOwnMessage {
   text: string,
   date: string
}

export default function DnOwnMessage({ date, text }: DnOwnMessage) {

   return (
      <div class={styles.msg_dont}>
         <p class={styles.msg_dont__text}>{text}</p>
         <div class={styles.msg_dont__time}>
            <div class={styles.msg_dont__flag_zero}>
               {flagRead({ isRead: true })}
            </div>
            {Time({ date, view: 'gray' })}
         </div>
      </div>
   )
}

