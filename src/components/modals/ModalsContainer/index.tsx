import CompileMaster from "@/core/CompileJSX"
import styles from './styles.module.scss'


interface ModalDefault {
   isOpen: boolean
   background: 'dark' | 'light_white' | 'white' | 'transparent'
   onClick?: () => void
   children: Node
}

export function ModalDefault({ background, onClick, isOpen, children }: ModalDefault) {

   const handle = () => {
      if (onClick) {
         onClick()
      }
   }



   return (
      <div class={`${isOpen ? '' : 'hidden'}  ${styles.back} ${styles[background]}`} onclick={handle} >
         <div class={styles.block}>
            {children}
         </div>
      </div>
   )
}