import CompileMaster from '@/core/CompileJSX'
import { ChatList } from 'src/types/chats'
import Avatar from '@/shared/Avatar'
import Time from '@/shared/Time/default'
import styles from './styles.module.scss'
import UnRead from './ui/UnReadCount'
import Component from '@/core/Component'

export default class ChatsListItem extends Component<ChatList> {
  protected render(): HTMLElement {
    const user = this.props.last_message.user
    //<p>{user.first_name}</p> <p>{user.second_name}</p>
    return (
      <li class={styles.item}>
        <a class={styles.link} href="#">
          <div class={styles.avatar}>{Avatar({ link: user.avatar })}</div>
          <div class={styles.body}>
            <p class={styles.body__title}>{this.props.title}</p>
            <p class={styles.body__content}>{this.props.last_message.content}</p>
          </div>
          <div class={styles.right}>
            <div class={styles.time}>
              {Time({ date: this.props.last_message.time, view: 'gray' })}
            </div>
            <div class={styles.unread}>
              {new UnRead({ number: this.props.unread_count }).getContent()}
            </div>
          </div>
        </a>
      </li>
    )
  }
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
