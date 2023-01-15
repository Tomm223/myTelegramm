import CompileMaster from "src/core/CompileJSX";
import styles from './styles.module.scss'

interface ButtonConstructor {
   onClick?: () => void,
   name: string
   view: 'primary' | 'transparent'
}




export default function ButtonConstructor({ onClick, view, name }: ButtonConstructor) {

   const handle = (e: MouseEvent) => {
      e.preventDefault()
      if (onClick) {
         onClick()
      }
   }

   return (
      <button class={`${styles[view]} ${styles.btn}`} onclick={handle}>{name}</button>
   )
}

