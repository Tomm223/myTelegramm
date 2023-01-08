import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Dots from 'static/icons/3dot.png'

export default function ButtonMore() {

   return (
      <button class={styles.btn}>
         <img class={styles.img} src={Dots} alt="dots" />
      </button>
   )
}