import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import { deepEqual } from '@/core/deepEqual'

type Videos = 'video/*'
type Images = '.png, .jpg, .jpeg'
type Doc = `.doc,.docx,.xml,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document`

let AcceptInput = {
  videos: 'video/*',
  images: '.png, .jpg, .jpeg',
  files: `.doc,.docx,.xml,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  'images+videos': 'video/* , .png, .jpg, .jpeg',
  local: 'local/*',
}

export type AcceptInputChoose = 'videos' | 'images' | 'files' | 'images+videos' | 'local'

interface InputFileType {
  isOpen: boolean
  name: string
  accepting: '.png, .jpg, .jpeg'
  onChange?: (value: any) => void
  multiple: boolean
}

export default class InputFile extends Component<InputFileType> {
  handleChange(e: Event) {
    let inp = e.target as HTMLInputElement
    if (this.props.onChange) {
      this.props.onChange(inp.value)
    }
  }

  protected addEvents(): void {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement

    input.addEventListener('change', this.handleChange.bind(this))
  }

  protected removeEvents(): void {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement

    input.removeEventListener('change', this.handleChange.bind(this))
  }

  protected shouldComponentUpdate(oldProps: InputFileType, newProps: InputFileType): boolean {
    if (oldProps.isOpen !== newProps.isOpen) {
      this.handleClick()
      return false
    }
    let isEqual = deepEqual(oldProps, newProps)
    return !isEqual
  }

  handleClick() {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input?.showPicker()
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
