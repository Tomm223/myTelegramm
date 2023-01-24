import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Pics from '@/static/icons/pics_profile.png'

interface AvatarForm {
   onClick: () => void
}

export default function AvatarForm({ onClick }: AvatarForm) {

   return (
      <div class={styles.avatar}>

         <div class={styles.avatar__img}>
            <img src={Pics} alt="setAvatar" />
            <div class={styles.avatar__hover} onclick={onClick}>Поменять аватар</div>
         </div>
         <h3 class={styles.avatar__name}>Даниил</h3>
      </div>
   )
}

