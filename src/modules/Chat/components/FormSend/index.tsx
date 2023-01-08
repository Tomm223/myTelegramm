import ButtonArrow from "@/components/buttons/ButtonArrow";
import ButtonAttach from "@/components/buttons/ButtonAttach";
import InputMessage from "@/components/inputs/InputMessage";
import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'


export default function FormSend() {

   return (
      <div class={styles.block}>
         {ButtonAttach()}
         <form class={styles.form}>
            {InputMessage({ name: 'input', placeholder: 'Сообщение' })}
            {ButtonArrow({})}
         </form>
      </div>
   )
}