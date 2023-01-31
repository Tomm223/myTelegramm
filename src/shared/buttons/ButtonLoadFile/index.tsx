import Component from '@/utils/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import InputFile from '@/shared/inputs/InputFile'

interface ButtonLoadFileType {
  isOpen?: boolean
  input?: Component
}

export default class ButtonLoadFile extends Component<ButtonLoadFileType> {
  handleClick(e: MouseEvent) {
    e.preventDefault()

    let inp = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    inp?.click()
  }

  protected addEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.removeEventListener('click', this.handleClick.bind(this))
  }

  protected preRender(): void {
    this.children.input = new InputFile({
      name: 'file',
      accepting: '.png, .jpg, .jpeg',
      isOpen: this.props.isOpen || false,
      onChange: (value: any) => {
        console.log(value)
      },
    })
  }

  protected componentDidUpdate(oldProps: ButtonLoadFileType, newProps: ButtonLoadFileType): void {
    console.log('update')
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <button class={styles.btn}>Выберите файл на компьютере</button>
        {/* {this.childrenHTML.elements.input} */}
        {new InputFile({
          name: 'file',
          accepting: '.png, .jpg, .jpeg',
          isOpen: false,
          onChange: (value: any) => {
            console.log(value)
          },
        }).getContent()}
      </div>
    )
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
