import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'

interface InputMessage {
   name: string,
   placeholder: string
}

export default function InputMessage({ name, placeholder }: InputMessage) {

   return (
      <input name={name} placeholder={placeholder} class={styles.input} type="text" />
   )
}
