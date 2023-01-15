import Avatar from "@/components/Avatar";
import ButtonMore from "@/components/buttons/ButtonMore";
import CompileMaster from "@/core/CompileJSX";
import MenuManageChat from "../MenuChat/ManageChat";
import styles from './styles.module.scss'

interface Header {
   img: string
   title: string
}

export default function Header({ img, title }: Header) {

   return (
      <div class={styles.header}>
         {Avatar({ link: img })}
         <h3 class={styles.title}>{title}</h3>
         <div class={styles.btn}>
            {ButtonMore({ isActive: true })}
         </div>
         <div class={styles.menu}>
            {MenuManageChat()}

         </div>
      </div>
   )
}

