import Component from '@/utils/Component'
import styles from '../styles.module.scss'
import CompileMaster from '@/core/CompileJSX'

interface InputSearchType {
  name: string
  events: Record<string, (e: any) => void>
}

export default class InputSearch extends Component<InputSearchType> {
  protected render(): HTMLInputElement {
    return <input class={styles.input} focus type="text" name={this.props.name} />
  }
}
