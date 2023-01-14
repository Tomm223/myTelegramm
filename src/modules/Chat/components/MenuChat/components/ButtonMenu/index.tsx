import CompileMaster from "@/core/CompileJSX";
import styles from "./styles.module.scss"

interface ButtonMenu {
   img: Node | string
   text: string
   onClick: () => void
}

export default function ButtonMenu({ img, text, onClick }: ButtonMenu) {

   const handle = (e: MouseEvent) => {
      e.preventDefault()
      if (onClick) {
         onClick()
      }
   }
   if (typeof img === 'string') {
      return (
         <button class={styles.btn} onclick={handle} >
            <img class={styles.img} src={img} alt="" />
            <p class={styles.text}>{text}</p>
         </button>
      )
   }
   return (
      <button class={styles.btn} onclick={handle} >
         <div class={styles.img}>
            {img}
         </div>
         <p class={styles.text}>{text}</p>
      </button>
   )
}