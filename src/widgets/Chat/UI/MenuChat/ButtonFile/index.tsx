import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import InputFile, { AcceptInputChoose } from '@/shared/inputs/InputFile'
import ButtonMenu from '../ButtonMenu'
//import styles from '../ButtonMenu/styles.module.scss'

interface ButtonFileType {
  img: string
  text: string
  inputName: string
  onSelect: () => void
  accepting: AcceptInputChoose
  btn?: Component
  input?: Component
}

export default class ButtonFile extends Component<ButtonFileType> {
  constructor(props: ButtonFileType) {
    props.input = new InputFile({
      multiple: false,
      name: props.inputName,
      accepting: props.accepting,
      isOpen: false,
      onChange: props.onSelect,
    })
    super(props)
  }

  handleClick() {
    console.log('open')
    if (Array.isArray(this.children.input)) return
    this.children.input.setProps({ isOpen: true })
  }

  protected init(): void {
    this.children.btn = new ButtonMenu({
      img: this.props.img,
      text: this.props.text,
      onClick: this.handleClick.bind(this),
    })
  }

  protected render(): HTMLElement {
    return (
      <div>
        {this.childrenHTML.elements.btn}
        {this.childrenHTML.elements.input}
      </div>
    )
  }
}
