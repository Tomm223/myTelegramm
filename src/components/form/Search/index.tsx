import CompileMaster from "@/core/CompileJSX"
import styles from './styles.module.scss'
import Img from '../../../../static/icons/search.svg'

interface Search {
   inputName: string
}



export default function Search({ inputName }: Search) {

   let isFocus = false

   const openInput = () => {
      isFocus = true
   }

   const submit = (e: MouseEvent) => {
      e.preventDefault()
   }

   if (isFocus) {
      return (
         <form onsunbmit={submit} class={styles.form_active} >
            <input class={styles.input} type="text" name={inputName} />
         </form>
      )
   }


   return (
      <form onsunbmit={submit} class={styles.form} >
         <button class={styles.btn}>
            <img src={Img} alt="Search" class={styles.img} />
            <p class={styles.btn__p}>Поиск</p>
         </button>
      </form>
   )
}

