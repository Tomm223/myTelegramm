import ChatsList from "@/modules/ChatsList"
import Search from "@/components/form/Search"
import CompileMaster from "@/core/CompileJSX"
import { ChatList } from "src/types/chats"
import styles from './styles.module.scss'
import Polygon1 from 'static/icons/Polygon 1.png'
import Chat from "@/modules/Chat"

export default function Messanger() {
   const gg: ChatList = {
      avatar: 'static/',
      id: 123,
      last_message: {
         content: 'нужно чтобы текст переходил на след строчку(в сумме 2) и заканчивался на "..."  даже если много текста',
         time: "2020-01-02T14:22:22.000Z",
         user: {
            avatar: "sds",
            email: 'goga.com',
            first_name: 'Goga',
            second_name: 'Gogich',
            login: "GogaOneLove",
            phone: '89539005757'
         }
      },
      title: "Chat Lohov",
      unread_count: 15
   }

   return (
      <main class={styles.main}>
         <nav class={styles.nav}>
            <div class={styles.nav__link}>
               <a class={styles.link_profile} href="">
                  <p class={styles.link_profile__text}>Профиль</p>
                  <img class={styles.link_profile__img} src={Polygon1} alt="" />
               </a>
            </div>
            <div class={styles.nav__search}>
               {Search()}
            </div>
            <div class={styles.nav__overflow}>
               {ChatsList({ list: Array(15).fill(gg) })}
            </div>
         </nav>
         {Chat()}
      </main>
   )
}