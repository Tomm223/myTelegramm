import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

export interface TimeForImages {
   time: string
}

export default function TimeForImages({ time }: TimeForImages) {

   const newTime = new Date(time)

   return (
      <div class={styles.block_image}>
         <p class={styles.block_image__time} >{newTime.getHours()}:{newTime.getMinutes()}</p>
      </div>
   )
}