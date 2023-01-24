import ButtonConstructor from "@/components/buttons/ButtonConstructor"
import ButtonsProfileNavigate from "@/components/buttons/ButtonProfileNavigate";
import InputProfile from "@/components/inputs/InputProfile";
import CompileMaster from "@/core/CompileJSX";
import ButtonsForm, { navBtnList } from "../ButtonsForm";
import styles from './styles.module.scss'
import AvatarForm from "../AvatarForm";

interface ProfileForm {
   isEdit?: boolean
   isPassword?: boolean
}
interface Input {
   label: string
   text: string
   name: string
   type: string
}

export default function ProfileForm({ isEdit = false, isPassword = false }: ProfileForm) {

   const inputsChange = {
      password: [
         { label: "Старый пароль", name: 'email', text: 'd@mail.ru', type: 'password' },
         { label: "Новый пароль", name: 'login', text: 'danOsip', type: 'password' },
         { label: "Повторите новый пароль", name: 'first_name', text: 'Daniil', type: 'password' },
      ],
      profile: [
         { label: "Почта", name: 'email', text: 'd@mail.ru', type: 'text' },
         { label: "Логин", name: 'login', text: 'danOsip', type: 'text' },
         { label: "Имя", name: 'first_name', text: 'Daniil', type: 'text' },
         { label: "Фамилия", name: 'second_name', text: 'Osipov', type: 'text' },
         { label: "Имя в чате", name: 'display_name', text: 'Dan', type: 'text' },
         { label: "Телефон", name: 'phone', text: '89539005656', type: 'text' }
      ]
   }

   let inputs = inputsChange.profile

   if (isPassword) {
      inputs = inputsChange.password
   }

   const toSave = () => {
      isEdit = false
      inputs = inputsChange.profile

   }

   const toEditProfile = () => {
      alert('go')
      isEdit = true
   }
   const toEditPassword = () => {
      isEdit = true
      inputs = inputsChange.profile
   }
   const toOut = () => { }

   const navBtnList: navBtnList[] = [
      { name: 'Изменить данные', onClick: toEditProfile, view: 'primary' },
      { name: 'Изменить пароль', onClick: toEditPassword, view: 'primary' },
      { name: 'Выйти', onClick: toOut, view: 'red' },
   ]


   return (
      <form action="" class={styles.form} style='width:500px;'>
         <div class={styles.form__avatar}>
            {AvatarForm({ onClick: () => { } })}
         </div>

         <div class={styles.form__inputs}>
            {...inputs.map(item => {
               return (<div class={styles.form__item}>
                  {InputProfile({
                     isEdit,
                     name: item.name,
                     label: item.label,
                     text: item.text,
                     type: item.type
                  })}
               </div>)
            })}

         </div>
         <div className={styles.form__buttons}>
            <div class={isEdit ? '' : 'hidden'}>
               {ButtonConstructor({ name: 'Сохранить', view: 'primary', onClick: toSave })}
               {ButtonConstructor({ name: "Не сохранять", view: 'transparent', onClick: () => { } })}
            </div>
            <div class={isEdit ? 'hidden' : ''}>
               {...navBtnList.map(item => {
                  return (
                     <div class={styles.form__item}>
                        {ButtonsProfileNavigate({
                           children: item.name,
                           onClick: item.onClick,
                           view: item.view
                        })}
                     </div>
                  )
               })}
            </div>
         </div>
      </form>
   )
}

/*
{isEdit ?
               <div>
                  {ButtonConstructor({ name: 'Сохранить', view: 'primary', onClick: toSave })}
               </div>
               :
               {
                  ...navBtnList.map(item => {
                     return (
                        <div class={styles.form__item}>
                           {ButtonsProfileNavigate({
                              children: item.name,
                              onClick: item.onClick,
                              view: item.view
                           })}
                        </div>
                     )
                  })
               }
            }

*/
