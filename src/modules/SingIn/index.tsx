import CompileMaster from "../../core/CompileJSX"
import styles from './styles.module.scss'
import Authtorizatition from '@/components/form/Authorization'
import InputText from "@/components/inputs/InputText"
import ButtonConstructor from "@/components/buttons/ButtonConstructor"
import { ModalDefault } from "@/components/modals/ModalsContainer"

interface SingIn {
   size: size,
   isOpen: boolean
}

interface size {
   width?: string
   height?: string
   borderRadius?: string
}

export default function SingIn({ size, isOpen }: SingIn) {

   //setTimeout(() => { isOpen = true; alert('go') }, 2000)

   const error = 'неверный пароль'

   const handle = () => alert('work')

   const style = `
      width: ${size.width};
      height: ${size.height};
      borderRadius: ${size.borderRadius}
   `

   return (
      <div>
         {ModalDefault({
            background: "white",
            isOpen: isOpen,
            onClick: () => { },
            children: (
               <div class={styles.block} style={style} >
                  {Authtorizatition({
                     title: "Вход",
                     inputs: [
                        InputText({
                           name: 'login',
                           placeholder: 'Логин',
                           error: error
                        }),
                        InputText({
                           name: 'password',
                           placeholder: 'Пароль',
                           error: error
                        })
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

/*
return (
      <div class={` ${isOpen ? '' : 'hidden'} modal_position ${styles.block}`} style={style} >

         {Authtorizatition({
            title: "Вход",
            inputs: [
               InputText({
                  name: 'login',
                  placeholder: 'Логин',
                  error: error
               }),
               InputText({
                  name: 'password',
                  placeholder: 'Пароль',
                  error: error
               })
            ],
            buttons: [
               ButtonConstructor({ name: 'Авторизоваться', onClick: handle, view: "primary" }),
               ButtonConstructor({ name: 'Нет аккаунта?', onClick: handle, view: "transparent" })
            ],
         })}
      </div>
   )
*/