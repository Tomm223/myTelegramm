import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Attach from 'static/icons/attach.svg'

interface ButtonAttach {
   onClick: () => {}
}

export default function ButtonAttach() {


   return (
      <button class={styles.btn}>
         <img class={styles.img} src={Attach} alt="Attach:file,photo..." />
      </button>
   )
}