import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface InputFileType {
  isOpen: boolean
  name: string
  accepting: '.png, .jpg, .jpeg'
  onChange?: (value: any) => void
}

export default class InputFile extends Component<InputFileType> {
  handleChange(e: Event) {
    let inp = e.target as HTMLInputElement

    if (this.props.onChange) {
      this.props.onChange(inp.value)
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('change', this.handleChange.bind(this))
  }

  protected removeEvents(): void {
    this._element?.removeEventListener('change', this.handleChange.bind(this))
  }

  protected componentDidUpdate(oldProps: InputFileType, newProps: InputFileType): void {
    if (this.props.isOpen) {
      console.log(this._element)

      this._element?.click()
    }
  }

  protected render(): HTMLElement {
    return <input type="file" class="hidden" accept={this.props.accepting} />
  }
}

/*
<div class={styles.block}>
        <button class={styles.btn}>Выберите файл на компьютере</button>
        <input
          class="hidden"
          accept={this.props.accepting}
          type="file"
          placeholder="Выберите файл"
        />
      </div>
*/
