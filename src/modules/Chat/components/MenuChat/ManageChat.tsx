import WindowDefault from "@/components/modals/ModalDefault/components/WindowDefault";
import CompileMaster from "@/core/CompileJSX";
import ButtonMenu from "./components/ButtonMenu";
import styles from "./styles.module.scss"

import Plus from '@/static/icons/plus.svg'
import Krest from '@/static/icons/krest.svg'

export default function MenuManageChat() {

   const style = "padding:15px;"

   const button = [
      { img: Plus, text: 'Добавить пользователя', onClick: () => { } },
      { img: Krest, text: 'Удалить пользователя', onClick: () => { } },
   ]
   return (
      <div class={styles.block}>
         {WindowDefault({
            style,
            children: (
               <ul class={styles.list}>
                  {...button.map(item => {
                     return (
                        <li class={styles.item}>
                           {ButtonMenu({
                              img: (
                                 <div class={styles.img}>
                                    <img src={item.img} alt="" />
                                 </div>
                              ),
                              text: item.text,
                              onClick: item.onClick
                           })}
                        </li>
                     )
                  })}
               </ul>
            )
         })}
      </div>
   )
}