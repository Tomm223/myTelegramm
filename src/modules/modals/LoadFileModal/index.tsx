import ButtonConstructor from "@/components/buttons/ButtonConstructor";
import Authorization from "@/components/form/Authorization";
import ModalDefault from "@/components/modals/ModalDefault";
import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'

interface LoadFileModal {
   isOpen: boolean
   size?: size
   error: string | undefined | null
}

interface size {
   width?: string
   height?: string
   borderRadius?: string
}

export default function LoadFileModal({ isOpen, size }: LoadFileModal) {

   return (
      <form>
         {ModalDefault({
            background: 'dark',
            isOpen: isOpen,
            onOut: () => { },
            size,
            children: (
               <div>
                  {Authorization({
                     title: "Загрузите файл",
                     inputs: [
                        <input type="file" placeholder='Выберите файл' />
                     ],
                     buttons: [
                        ButtonConstructor({ name: 'Загрузить', onClick: () => { }, view: "primary" })
                     ],
                     onSubmit: () => { }
                  })}
               </div>
            )

         })}
      </form>
   )
}

