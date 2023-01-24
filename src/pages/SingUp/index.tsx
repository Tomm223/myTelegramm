import CompileMaster from "../../core/CompileJSX"
import Authorizatition from '@/components/form/Authorization'
import InputText from "@/components/inputs/InputText"
import ButtonConstructor from "@/components/buttons/ButtonConstructor"
import ModalDefault from "@/components/modals/ModalDefault"
import styles from './styles.module.scss'


interface SingUp {
   size: size,
   onSubmit: (form: form) => void
}
interface form {
   email: string
   login: string
   first_name: string
   second_name: string
   password: string
}

interface size {
   width?: string
   height?: string
   borderRadius?: string
}

export default function SingUp({ size, onSubmit }: SingUp) {

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
               <div style="width:100%; height:100%">
                  {Authorizatition({
                     title: "Регистрация",
                     inputs: [
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'email',
                              placeholder: 'Почта',
                              error: error
                           })}
                        </div>,
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'login',
                              placeholder: 'Логин',
                              error: error
                           })}
                        </div>,
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'first_name',
                              placeholder: 'Имя',
                              error: error
                           })}
                        </div>,
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'second_name',
                              placeholder: 'Фамилия',
                              error: error
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
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'phone',
                              placeholder: 'Телефон',
                              error: error,
                              type: 'number'

                           })}
                        </div>,
                     ],
                     buttons: [
                        ButtonConstructor({ name: 'Зарегестрироваться', onClick: handle, view: "primary" }),
                        ButtonConstructor({ name: 'Войти', onClick: handle, view: "transparent" })
                     ],
                  })}
               </div>
            )
         })}
      </div>
   )
}


