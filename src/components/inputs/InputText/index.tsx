import CompileMaster from "../../../core/CompileJSX"
import styles from './styles.module.scss'

interface InputText {
   error?: string | null
   name: string
   placeholder: string
   type?: 'password' | 'text' | 'number'
}

export default function InputText({ error, name, placeholder, type }: InputText) {

   let focus = false

   /*input.addEventListener('focus', () => {
      console.log('focus work');

   })*/

   // onfocus={} onblur={}

   return (
      <div class={styles.block}>
         <label for={name} class={`${focus ? 'hidden' : ''} ${styles.label}`} htmlFor={name}>{placeholder}</label>
         <input id={name} name={name} type={type ? type : 'text'} class={styles.input} />
         <p class={`${error ? '' : 'hidden'}  ${styles.error}`}>{error ? error : ''}</p>
      </div>
   )
}

// <p class={`${error ? 'hidden' : ''}  ${styles.error__message}`}>{error}</p>


