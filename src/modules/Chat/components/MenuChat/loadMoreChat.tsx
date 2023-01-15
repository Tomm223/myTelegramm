import WindowDefault from "@/components/modals/ModalDefault/components/WindowDefault";
import CompileMaster from "@/core/CompileJSX";
import styles from "./styles.module.scss"
import Photo from '@/static/icons/pics_message.svg'
import File from '@/static/icons/file.svg'
import Local from '@/static/icons/local.svg'
import ButtonMenu from "./components/ButtonMenu";



export default function MenuLoadMoreChat() {

   const style = "padding:15px;"

   const button = [
      { img: Photo, text: 'Фото или Видео', onClick: () => { } },
      { img: File, text: 'Файл', onClick: () => { } },
      { img: Local, text: 'Локация', onClick: () => { } }
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
                              img: item.img,
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