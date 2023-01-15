import CompileMaster from "@/core/CompileJSX"
import WindowDefault from "./components/WindowDefault"
import styles from './styles.module.scss'

interface ModalDefault {
   size?: size,
   isOpen: boolean
   background: background
   onOut?: () => void
   children: Node,
}
type background = 'dark' | 'light_white' | 'white' | 'transparent'

interface size {
   width?: string
   height?: string
   borderRadius?: string
}

export default function ModalDefault({ size, isOpen, onOut, background, children }: ModalDefault) {

   const handle = () => {
      if (onOut) {
         onOut()
      }
   }


   const style = `
   width: ${size?.width};
   height: ${size?.height};
   border-radius: ${size?.borderRadius};
   padding:40px 30px;
   padding-bottom:20px;
`

   return (
      <div class={`${isOpen ? '' : 'hidden'}  ${styles.back} ${styles[background]}`} onclick={handle} >
         <div class={styles.block}>
            {WindowDefault({
               style,
               children
            })}
         </div>
      </div>
   )
}
