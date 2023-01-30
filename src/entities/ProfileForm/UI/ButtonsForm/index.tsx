import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ButtonsProfileNavigate from '@/shared/buttons/ButtonProfileNavigate'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface ButtonsForm {
  isEdit: boolean
  navBtnList: navBtnListType[]
}
export interface navBtnListType {
  name: string
  onClick: () => void
  view: 'primary' | 'red'
}

export default function ButtonsForm({ isEdit, navBtnList }: ButtonsForm) {
  if (isEdit) {
    return (
      <div>
        {ButtonConstructor({
          name: 'Сохранить',
          view: 'primary',
          onClick: () => {},
        })}
      </div>
    )
  }
  return (
    <div>
      {...navBtnList.map((item) => {
        return ButtonsProfileNavigate({
          children: item.name,
          onClick: item.onClick,
          view: item.view,
        })
      })}
    </div>
  )
}
