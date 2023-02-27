import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface LoaderDefaultType {
  width?: string
  borderWidth?: string
}

export default class LoaderDefault extends Component<LoaderDefaultType> {
  protected render(): HTMLElement {
    const style = `width:${this.props.width}; height:${this.props.width}; 
    border-width:${this.props.borderWidth};`
    return (
      <div class={styles.block}>
        <div class={styles.loader} style={style}>
          <div class={styles.loader__item_one}></div>
          <div class={styles.loader__item_two}></div>
          <div class={styles.loader__item_tree}></div>
        </div>
      </div>
    )
  }
}
