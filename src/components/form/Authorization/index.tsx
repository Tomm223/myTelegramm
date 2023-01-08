import CompileMaster from "../../../core/CompileJSX"
import styles from './styles.module.scss'

interface Authtorization {
   inputs: Node[]
   buttons: Node[]
   title: string
}


export default function Authorization({ inputs, title, buttons }: Authtorization) {

   return (
      <div class={styles.block}>
         <h3 class={styles.title}>{title}</h3>
         <form class={styles.form} >
            <div class={styles.inputs}>
               {...inputs}
            </div>
            <div class={styles.buttons}>
               {...buttons}
            </div>
         </form>
      </div>
   )
}