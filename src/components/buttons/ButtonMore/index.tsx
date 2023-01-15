import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Dots from 'static/icons/3dots.svg'
import DotsBlue from 'static/icons/3dots_blue.svg'

interface ButtonMore {
   isActive: boolean
}

export default function ButtonMore({ isActive }: ButtonMore) {

   return (
      <button class={isActive ? styles.btn_active : styles.btn}>
         <img class={styles.img} src={isActive ? DotsBlue : Dots} alt="dots" />
      </button>
   )
}