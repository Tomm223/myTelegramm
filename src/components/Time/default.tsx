import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

export interface Time {
   time: string
}

export default function Time({ time }: Time) {

   const newTime = new Date(time)

   return (
      <div class={styles.block}>
         <p class={styles.block__time} >{newTime.getHours()}:{newTime.getMinutes()}</p>
      </div>
   )
}