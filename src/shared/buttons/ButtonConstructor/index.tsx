import Component from '@/utils/Component'
import CompileMaster from 'src/core/CompileJSX'
import styles from './styles.module.scss'

interface ButtonConstructorType {
  events?: Record<string, (...args: any) => void>
  name: string
  view: 'primary' | 'transparent'
}

export default class ButtonConstructor extends Component<ButtonConstructorType> {
  protected render(): HTMLElement {
    return <button class={`${styles[this.props.view]} ${styles.btn}`}>{this.props.name}</button>
  }
}
