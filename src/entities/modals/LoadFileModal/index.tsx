import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import Authorization from '@/shared/form/FormConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface LoadFileModal {
  isOpen: boolean
  size?: Size
  error: string | undefined | null
}

interface Size {
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
        onOut: () => {},
        size,
        children: (
          <div>
            {Authorization({
              title: 'Загрузите файл',
              inputs: [<input type="file" placeholder="Выберите файл" />],
              buttons: [
                new ButtonConstructor({
                  name: 'Загрузить',
                  view: 'primary',
                }).getContent() || <div></div>,
              ],
              onSubmit: () => {},
            })}
          </div>
        ),
      })}
    </form>
  )
}
