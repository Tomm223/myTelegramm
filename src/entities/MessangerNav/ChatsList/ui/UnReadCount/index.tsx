import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import styles from './styles.module.scss'

interface UnReadType {
  number: number
}

export default class UnRead extends Component<UnReadType> {
  protected render(): HTMLElement {
    return <div class={this.props.number ? styles.circle : 'hidden'}>{this.props.number}</div>
  }
}
