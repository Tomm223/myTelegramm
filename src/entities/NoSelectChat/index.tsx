import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

export default class NoSelectChat extends Component {
  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <span class={styles.text}>Выберите чат и начните общение</span>
      </div>
    )
  }
}
