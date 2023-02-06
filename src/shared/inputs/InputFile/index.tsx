import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

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
  accepting: AcceptInputChoose
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
    return (
      <input
        type="file"
        class="hidden"
        name={this.props.name}
        accept={AcceptInput[this.props.accepting]}
        multiple
      />
    )
  }
}
