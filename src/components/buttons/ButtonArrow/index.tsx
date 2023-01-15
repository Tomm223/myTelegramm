import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Arrow from '@/static/icons/arrow-circle.svg'

interface ButtonArrow {
   onClick?: () => void | undefined
}

export default function ButtonArrow({ onClick }: ButtonArrow) {
   const handle = (e: MouseEvent) => {
      e.preventDefault()
      if (onClick) {
         onClick()
      }
   }
   return (
      <button class={styles.btn} onclick={handle}>
         <img class={styles.img} src={Arrow} alt="Arrow" />
      </button>
   )
}