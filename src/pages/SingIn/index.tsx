import CompileMaster from "../../core/CompileJSX"
import Authorizatition from '@/components/form/Authorization'
import InputText from "@/components/inputs/InputText"
import ButtonConstructor from "@/components/buttons/ButtonConstructor"
import ModalDefault from "@/components/modals/ModalDefault"
import styles from './styles.module.scss'

interface SingIn {
   size: size,
   onSubmit: (form: form) => void
}
interface form {
   login: string
   password: string
}

interface size {
   width?: string
   height?: string
   borderRadius?: string
}

export default function SingIn({ size, onSubmit }: SingIn) {

   const error = 'неверный пароль'

   const handle = () => alert('work')



   return (
      <div>
         {ModalDefault({
            background: 'white',
            size,
            isOpen: true,
            onOut: () => { },
            children: (
               <div style="width:100%; height:100%;">
                  {Authorizatition({
                     title: "Вход",
                     inputs: [
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'login',
                              placeholder: 'Логин',
                              error: error,
                              type: 'text'
                           })}
                        </div>,
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'password',
                              placeholder: 'Пароль',
                              error: error,
                              type: 'password'
                           })}
                        </div>,
                     ],
                     buttons: [
                        ButtonConstructor({ name: 'Авторизоваться', onClick: handle, view: "primary" }),
                        ButtonConstructor({ name: 'Нет аккаунта?', onClick: handle, view: "transparent" })
                     ],
                  })}
               </div>
            )
         })}
      </div>
   )
}
