import ButtonConstructor from "@/components/buttons/ButtonConstructor";
import CompileMaster from "@/core/CompileJSX";
import LinkToProfile from "@/modules/ChatNav/components/LinkToProfile";
import styles from './styles.module.scss'

interface Error {
   numberError: number | undefined | null
   type: '400' | '500'
}

export default function Error({ numberError = 404, type }: Error) {

   const text = type === '400' ? 'Не туда попали' : 'Мы уже фиксим'


   return (
      <main class={styles.container}>
         <div class={styles.center}>
            <header class={styles.center__head}>
               <h3 class={styles.center__type}>{numberError}</h3>
               <p class={styles.text}>{text}</p>
            </header>
            <div class={styles.center__link}>
               {ButtonConstructor({ view: 'transparent', name: 'Назад к чатам' })}
            </div>
         </div>
      </main>
   )
}