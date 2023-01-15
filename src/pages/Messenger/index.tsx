import CompileMaster from "@/core/CompileJSX"
import styles from './styles.module.scss'
import Chat from "@/modules/Chat"
import ChatNav from "@/modules/ChatNav"
import AddUser from "@/modules/modals/AddUser"
import RemoveUser from "@/modules/modals/RemoveUser"

export default function Messanger() {

   let isAddUserWindow = false
   let isRemoveUserWindow = false

   const pathname = window.location.pathname

   const [path, category] = pathname.split("/").slice(1)

   if (category === 'add-user') {
      isAddUserWindow = true
   }
   if (category === 'remove-user') {
      isRemoveUserWindow = true
   }

   return (
      <div class={styles.main}>
         {AddUser({ size: { width: '340px', height: '260px' }, isOpen: isAddUserWindow, onClick: () => { } })}
         {RemoveUser({ size: { width: '340px', height: '260px' }, isOpen: isRemoveUserWindow, onClick: () => { } })}
         <div class={styles.container}>
            {ChatNav()}
            {Chat()}
         </div>
      </div>
   )
}
