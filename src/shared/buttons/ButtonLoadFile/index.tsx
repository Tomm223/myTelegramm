import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputFile, { AcceptInputChoose } from '@/shared/inputs/InputFile'

interface ButtonLoadFileType {
  label?: string
  isOpen?: boolean
  input?: Component
  name: string
  accepting: AcceptInputChoose
}

export default class ButtonLoadFile extends Component<ButtonLoadFileType> {
  constructor(props: ButtonLoadFileType) {
    props.label = 'Выберите файл на компьютере'

    super(props)
  }

  handleChange(value: any) {
    if (this.props.label !== 'Выберите файл на компьютере') return
    this.setProps({
      label: 'вы выбрали файл',
      accepting: this.props.accepting,
      name: this.props.name,
    })
  }

  handleClick(e: MouseEvent) {
    e.preventDefault()
    if (!this.children.input) return
    if (Array.isArray(this.children.input)) return

    this.children.input.setProps({ isOpen: !this.children.input.props.isOpen })
  }

  protected addEvents(): void {
    const btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    const btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.removeEventListener('click', this.handleClick.bind(this))
  }

  protected init(): void {
    this.children.input = new InputFile({
      name: this.props.name,
      accepting: this.props.accepting,
      isOpen: false,
      onChange: this.handleChange.bind(this),
      multiple: false,
    })
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <button class={styles.btn}>{this.props.label}</button>
        {this.childrenHTML.elements.input}
      </div>
    )
  }
}
