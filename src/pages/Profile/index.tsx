import LinkToBack from "@/components/links/LinkToBack";
import CompileMaster from "@/core/CompileJSX";
import LoadFileModal from "@/modules/modals/LoadFileModal";
import ButtonsForm from "./components/ButtonsForm";
import ProfileForm from "./components/ProfileForm";
import styles from './styles.module.scss'

interface Profile {
   isEdit?: boolean
   isEditAvatar?: boolean
   isPassword?: boolean
}

export default function Profile({ isEdit = false, isEditAvatar = false, isPassword = false }: Profile) {

   const inputsChange = {
      password: [
         { label: "Старый пароль", name: 'email', text: 'd@mail.ru', type: 'password' },
         { label: "Новый пароль", name: 'login', text: 'danOsip', type: 'password' },
         { label: "Повторите новый пароль", name: 'first_name', text: 'Daniil', type: 'password' },
      ],
      profile: [
         { label: "Почта", name: 'email', text: 'd@mail.ru', type: 'text' },
         { label: "Имя в чате", name: 'login', text: 'danOsip', type: 'text' },
         { label: "Имя", name: 'first_name', text: 'Daniil', type: 'text' },
         { label: "Фамилия", name: 'second_name', text: 'Osipov', type: 'text' },
         { label: "Телефон", name: 'phone', text: '89539005656', type: 'text' }
      ]
   }

   let isAvatarWindow = false

   const pathname = window.location.pathname

   const [path, category, type] = pathname.split("/").slice(1)

   if (category === 'data') {
      isPassword = false
   }
   if (category === 'password') {
      isPassword = true
   }
   if (category === 'avatar-edit') {
      isAvatarWindow = true
   }
   if (type === 'edit') {
      isEdit = true
   }
   if (type === 'no-edit' || type === undefined) {
      isEdit = false
   }


   return (
      <div class={styles.container}>
         {LoadFileModal({ isOpen: isAvatarWindow, size: { height: '260px' }, error: null })}
         <div class={styles.link_back}>
            {LinkToBack({ href: '/' })}
         </div>
         <div class={styles.form}>
            {ProfileForm({ isEdit, isPassword })}
         </div>
      </div>
   )
}


/**
 *  {LoadFileModal({ isOpen: isAvatarWindow, size: { height: '260px' }, error: null })}
         <div class={styles.link_back}>
            {LinkToBack({ href: '/' })}
         </div>
         <div class={styles.form}>
            {ProfileForm({ isEdit, isPassword })}
         </div>
 */