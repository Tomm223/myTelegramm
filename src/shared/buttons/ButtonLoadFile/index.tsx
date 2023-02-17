import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputFile, { AcceptInputChoose } from '@/shared/inputs/InputFile'

interface ButtonLoadFileType {
  isOpen?: boolean
  input?: Component
  name: string
  accepting: AcceptInputChoose
}

export default class ButtonLoadFile extends Component<ButtonLoadFileType> {
  constructor(props: ButtonLoadFileType) {
    props.input = new InputFile({
      name: props.name,
      accepting: props.accepting,
      isOpen: false,
      onChange: (value: any) => {
        console.log(value)
      },
    })
    super(props)
  }

  handleClick(e: MouseEvent) {
    // e.preventDefault()
    if (!this.children.input) return
    if (Array.isArray(this.children.input)) return

    this.children.input.setProps({ isOpen: true })
  }

  protected addEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.removeEventListener('click', this.handleClick.bind(this))
  }

  protected componentDidUpdate(oldProps: ButtonLoadFileType, newProps: ButtonLoadFileType): void {
    console.log('update')
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <button class={styles.btn}>Выберите файл на компьютере</button>
        {this.childrenHTML.elements.input}
      </div>
    )
  }
}
