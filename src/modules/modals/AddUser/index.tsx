import Authorization from "@/components/form/Authorization";
import ModalDefault from "@/components/modals/ModalDefault";
import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import InputText from "@/components/inputs/InputText";
import ButtonConstructor from "@/components/buttons/ButtonConstructor";

interface AddUser {
   onClick: () => void
   isOpen: boolean
   size: size
}

interface size {
   width?: string
   height?: string
   borderRadius?: string
}

export default function AddUser({ onClick, isOpen, size }: AddUser) {

   return (
      <div>
         {ModalDefault({
            background: 'dark',
            isOpen,
            size,
            onOut: () => { 'setIsOpen' },
            children: (
               <div style="width:100%; height:100%;">
                  {Authorization({
                     title: 'Добавить Пользователя',
                     inputs: [
                        <div class={styles.form__item}>
                           {InputText({
                              name: 'name',
                              placeholder: 'Имя',
                              error: null
                           })}
                        </div>
                     ],
                     buttons: [
                        <div class={styles.form__item}>
                           {ButtonConstructor({ name: 'Добавить', view: 'primary', onClick: () => { } })}
                        </div>
                     ],
                     onSubmit: () => { }

                  })}
               </div>
            )
         })}
      </div>
   )
}

