import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

export interface Time {
   date: string
   view: "gray" | "white" | "blue"
}

export default function Time({ date, view }: Time) {

   const newTime = new Date(date)

   return (
      <div class={styles.block}>
         <p class={styles[view]} >{newTime.getHours()}:{newTime.getMinutes()}</p>
      </div>
   )
}

