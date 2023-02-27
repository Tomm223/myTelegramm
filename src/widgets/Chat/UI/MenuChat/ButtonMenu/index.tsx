import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import InputFile, { AcceptInputChoose } from '@/shared/inputs/InputFile'
>>>>>>> 202543e185edbb6c76121c6c5c22a173cfe03d8a
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
<<<<<<< HEAD
        <div class={styles.img}>{this.props.img}</div>
=======
import { EventBus } from '@/core/EventBus'
import InputFile, { AcceptInputChoose } from '@/shared/inputs/InputFile'
import { ButtonMenuBus, ButtonMenuEVENTS } from './eventbus'
import styles from './styles.module.scss'

interface ButtonMenuType {
  img: string
  text: string
  onClick?: () => void
}

export default class ButtonMenu extends Component<ButtonMenuType> {
  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    ButtonMenuBus.on(ButtonMenuEVENTS.CLICK(this.id), this.handleClick.bind(this))
  }

  handleClick(e: MouseEvent) {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  protected addEvents(): void {
    this._element?.addEventListener('click', this.handleClick.bind(this))
  }

  protected removeEvents(): void {
    this._element?.removeEventListener('click', this.handleClick.bind(this))
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
>>>>>>> sprint_3
=======
        {img}
>>>>>>> 202543e185edbb6c76121c6c5c22a173cfe03d8a
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
