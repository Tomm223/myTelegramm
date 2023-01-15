import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

export interface TimeForImages {
   date: string
}

export default function TimeForImages({ date }: TimeForImages) {

   const newTime = new Date(date)

   return (
      <div class={styles.block_image}>
         <p class={styles.block_image__time} >{newTime.getHours()}:{newTime.getMinutes()}</p>
      </div>
   )
}
