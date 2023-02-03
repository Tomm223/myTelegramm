import Component from '@/core/Component'
import styles from '../styles.module.scss'
import CompileMaster from '@/core/CompileJSX'
import Img from '@/static/icons/search.svg'

interface ButtonSearchType {
  events?: Record<string, (e: any) => void>
}

export default class ButtonSearch extends Component<ButtonSearchType> {
  protected render(): HTMLElement {
    return (
      <button class={styles.btn}>
        <img src={Img} alt="Search" class={styles.img} />
        <p class={styles.btn__p}>Поиск</p>
      </button>
    )
  }
}
