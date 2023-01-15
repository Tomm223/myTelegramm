import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'

interface ButtonsProfileNavigate {
   children: Node | string
   onClick: () => void
   view: "primary" | "red"
}

export default function ButtonsProfileNavigate({ children, onClick, view }: ButtonsProfileNavigate) {
   function handle(e: MouseEvent) {
      console.log('0');

      e.preventDefault()
      console.log('go');

      if (onClick) {
         console.log('go2');

         onClick()
      }
   }
   return (
      <button type="button" onclick={handle} class={styles[view]}>
         {children}
      </button>
   )
}


