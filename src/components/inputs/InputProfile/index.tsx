import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'

interface InputProfile {
   isEdit: boolean,
   name: string,
   label: string
   text: string
   type: string
}

export default function InputProfile({ isEdit, name, type, label, text }: InputProfile) {



   return (
      <div class={styles.block}>
         <label class={styles.label} for={name}>{label}</label>
         <input class={styles.input} type={type} name={name} disabled={!isEdit} value={text} />
      </div>
   )
}