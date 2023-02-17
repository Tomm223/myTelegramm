import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import InputFile, { AcceptInputChoose } from '@/shared/inputs/InputFile'
import styles from './styles.module.scss'

interface ButtonMenuType {
  img?: string
  text?: string
  events?: Record<string, () => void>
  input?: Component
  inputName: string
  onSelect: () => void
  accepting: AcceptInputChoose
}

export default class ButtonMenu extends Component<ButtonMenuType> {
  constructor(props: ButtonMenuType) {
    props.input = new InputFile({
      name: props.inputName,
      accepting: props.accepting,
      isOpen: false,
      onChange: props.onSelect,
    })

    super(props)
  }

  handleClick() {
    if (Array.isArray(this.children.input)) return
    this.children.input.setProps({ isOpen: true })
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected render(): HTMLElement {
    let img =
      typeof this.props.img === 'string' ? (
        <div class={styles.img}>
          <img src={this.props.img} alt="" />
        </div>
      ) : (
        <div class={styles.img}>{this.props.img}</div>
      )

    return (
      <button class={styles.btn}>
        {img}
        <p class={styles.text}>{this.props.text}</p>
        {this.childrenHTML.elements.input}
        {/* {new InputFile({
          name: this.props.inputName,
          accepting: '.png, .jpg, .jpeg',
          isOpen: false,
          onChange: this.props.onSelect,
        }).getContent()} */}
      </button>
    )
  }
}
