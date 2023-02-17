import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import styles from './styles.module.scss'

interface WindowDefaultType {
  children: Component | Component[] | HTMLElement
  style: string
}

export default class WindowDefault extends Component<WindowDefaultType> {
  protected render(): HTMLElement {
    return (
      <div class={styles.block} style={this.props.style}>
        {this.childrenHTML.elements.children ||
          this.childrenHTML.lists.children ||
          this.props.children}
      </div>
    )
  }
}
