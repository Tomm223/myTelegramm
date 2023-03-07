import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import { deepEqual } from '@/core/deepEqual'

type Videos = 'video/*'
type Images = '.png, .jpg, .jpeg'
type Doc = `.doc,.docx,.xml,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document`

const AcceptInput = {
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
  multiple: boolean
}

export default class InputFile extends Component<InputFileType> {
  handleChange(e: Event) {
    const inp = e.target as HTMLInputElement
    if (this.props.onChange) {
      this.props.onChange(inp.value)
    }
  }

  protected addEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement

    input.addEventListener('change', this.handleChange.bind(this))
  }

  protected removeEvents(): void {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement

    input.removeEventListener('change', this.handleChange.bind(this))
  }

  protected shouldComponentUpdate(oldProps: InputFileType, newProps: InputFileType): boolean {
    if (oldProps.isOpen !== newProps.isOpen) {
      this.handleClick()
      return false
    }
    const isEqual = deepEqual(oldProps, newProps)
    return !isEqual
  }

  handleClick() {
    const input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input?.showPicker()
  }

  protected render(): HTMLElement {
    return (
      <div class="hidden">
        <input
          type="file"
          name={this.props.name}
          accept={AcceptInput[this.props.accepting]}
          multiple={this.props.multiple}
        />
      </div>
    )
  }
}
