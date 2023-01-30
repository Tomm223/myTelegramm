import CompileMaster from '@/core/CompileJSX'
import Component from '@/utils/Component'
import WindowDefault from './components/WindowDefault'
import styles from './styles.module.scss'

interface ModalDefaultType {
  size?: Size
  isOpen: boolean
  background: Background
  onOut?: () => void
  children: Component
  style?: string
  window?: Component
}
type Background = 'dark' | 'light_white' | 'white' | 'transparent'

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class ModalDefault extends Component<ModalDefaultType> {
  constructor(props: ModalDefaultType) {
    props.style = `
   width: ${props.size?.width};
   height: ${props.size?.height};
   border-radius: ${props.size?.borderRadius};
   padding:40px 30px;
   padding-bottom:20px;
`
    props.window = new WindowDefault({
      style: props.style || '',
      children: props.children,
    })

    super(props)
  }

  protected render(): HTMLElement {
    return (
      <div
        class={`${this.props.isOpen ? '' : 'hidden'}  ${styles.back} ${
          styles[this.props.background]
        }`}
        onclick={this.props.onOut}
      >
        <div class={styles.block}>{this.childrenHTML.elements.window}</div>
      </div>
    )
  }
}
