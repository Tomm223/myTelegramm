import CompileMaster from "@/core/CompileJSX"
import { ChatList } from "src/types/chats"
import Avatar from "@/components/Avatar"
import Time from "@/components/Time/default"
import styles from './styles.module.scss'
import UnRead from "./ui/UnReadCount"


export default function ChatsListItem({ avatar, id, last_message, title, unread_count }: ChatList) {
   const user = last_message.user
   //<p>{user.first_name}</p> <p>{user.second_name}</p>
   return (
      <li id={id} class={styles.item}>
         <a class={styles.link} href="#">
            <div class={styles.avatar}>
               {Avatar({ link: user.avatar, })}
            </div>
            <div class={styles.body}>
               <p class={styles.body__title} >{title}</p>
               <p class={styles.body__content}>{last_message.content}</p>
            </div>
            <div class={styles.right}>
               <div class={styles.time}>
                  {Time({ time: last_message.time })}
               </div>
               <div class={styles.unread}>
                  {UnRead({ number: unread_count })}
               </div>
            </div>
         </a>
      </li>
   )
}

/**
 * <li id={id} class={styles.item}>
         <a class={styles.link} href="#">
            {Avatar({ link: user.avatar, })}
            <div class={styles.body}>
               <p class={styles.body__title} >{title}</p>
               <p class={styles.body__content}>{last_message.content}</p>
            </div>
            <div class={styles.right}>
               {Time({ time: last_message.time })}
               <div></div>
               {UnRead({ number: unread_count })}
            </div>
         </a>
      </li>
 */