import CompileMaster from "@/core/CompileJSX"
import styles from './styles.module.scss'
import Img from '../../../../static/icons/Union.png'


export default function Search() {

   let isFocus = false

   const openInput = () => {
      isFocus = true
   }

   const submit = (e: MouseEvent) => {
      e.preventDefault()
   }

   if (isFocus) {
      return (
         <form onsunbmit={submit} class={styles.form} >
            <input class={styles.input} type="text" />
            <button class="hidden" type="submit"></button>
         </form>
      )
   }


   return (
      <form onsunbmit={submit} class={styles.form} >
         <button class={styles.btn}>
            <img src={Img} alt="Search" class={styles.img} />
            <p class={styles.btn__p}>Поиск</p>
         </button>
         <button class="hidden" type="submit"></button>
      </form>
   )
}