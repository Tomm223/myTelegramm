import Component from '@/core/Component'
import { EventBus } from '@/core/EventBus'
import CompileMaster from '../../../core/CompileJSX'
import { FormConstrEventBus, FormConstrEVENTS } from './eventbus'
import styles from './styles.module.scss'
import { ValidateForm } from './types'

export interface FormConstructorType {
  setting?: 'files' | 'string'
  ref?: string
  inputs?: Component[]
  buttons?: Component[]
  onSubmit?: (data: any) => void
  validate?: ValidateForm
  _render?: boolean
  disable?: boolean
  error?: string
}

function handleClick(id: number | string) {
  return (e: Event) => {
    e.preventDefault()
    FormConstrEventBus.emit(FormConstrEVENTS.SUBMIT(id), e)
  }
}
function handleKeyDown(id: number | string) {
  return (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick(id)
    }
  }
}
function handleBlur(id: number | string) {
  return (e: Event) => {
    e.preventDefault()
    FormConstrEventBus.emit(FormConstrEVENTS.CHECK_VALID(id), e)
  }
}

export default class FormConstructor extends Component<FormConstructorType> {
  /**
   * @param {Component[]} inputs => Component.id ===  Component.TagInput.getAttribute('id)
   * @param {Component[]} buttons => one child require TagButton.type = 'submit'
   */
  constructor(props: FormConstructorType) {
    if (typeof props.error !== 'string') {
      props.error = ''
    }
    if (typeof props.disable !== 'boolean') {
      props.disable = false
    }

    super(props)
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    FormConstrEventBus.on(FormConstrEVENTS.SUBMIT(this.id), this.handlerSubmit.bind(this))
    FormConstrEventBus.on(FormConstrEVENTS.CHECK_VALID(this.id), this.handlerBlur.bind(this))
  }

  handlerBlur(e: Event) {
    if (!this.props.validate) return

    let input = e.target as HTMLInputElement
    let condidateError = this.props.validate[input.name](input.value)

    let childs = this.children.inputs as Component[]

    childs.forEach((child) => {
      if (child.id === input.id) {
        this.removeEventBlurInput(child)
        child.setProps({ error: condidateError })
        this.addEventBlurInput(child)
      }
    })
  }

  addEventBlurInput(child: Component) {
    const inp = child._element?.getElementsByTagName('input')[0] as HTMLInputElement
    inp.addEventListener('blur', handleBlur(this.id))
  }

  removeEventBlurInput(child: Component) {
    const inp = child._element?.getElementsByTagName('input')[0] as HTMLInputElement
    inp.removeEventListener('blur', handleBlur(this.id))
  }

  public resetForm() {
    const childs = this.children.inputs as Component[]
    for (const i in childs) {
      childs[i].props.error = ''
    }
    for (const i in childs) {
      const input = childs[i]._element?.getElementsByTagName('input')[0] as HTMLInputElement
      input.value = ''
    }
  }

  async handlerSubmit() {
    if (!this._element) return
    if (!this.props.onSubmit) return

    if (!this.isValidForm()) return

    const inputs = this._element.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>

    const result = {} as Record<string, any>
    for (const i in inputs) {
      if (typeof inputs[i] === 'number' || typeof inputs[i] === 'function') {
        continue
      }
      if (this.props.setting === 'files') {
        result[inputs[i].name] = inputs[i].files
      } else {
        result[inputs[i].name] = inputs[i].value
      }
    }
    await this.props.onSubmit(result)
    this.resetForm()
  }

  isValidForm(): boolean {
    const childs = this.children.inputs as Component[]
    for (const i in childs) {
      if (childs[i].props.error) {
        return false
      }
    }
    const inputs = this._element?.getElementsByTagName('input')

    let isValid = true
    for (const i in inputs) {
      if (typeof inputs[i] === 'object' && !inputs[i].value) {
        this.handlerBlur({ target: inputs[i] } as Event)
        isValid = false
      }
    }

    return isValid
  }

  public resetFormEvents() {
    if (this.props.onSubmit) {
      // onSubmit form
      const submit = this._element?.querySelector('[type="submit"]')

      submit?.removeEventListener('click', handleClick(this.id))
    }
    if (!Array.isArray(this.children.inputs)) return

    this.children.inputs.forEach((child) => this.removeEventBlurInput(child))
  }

  handleDisable() {
    const submit = this._element?.querySelector('[type="submit"]')

    if (!this.props.disable) {
      if (submit?.hasAttribute('disable')) {
        submit?.removeAttribute('disable')
      }
      return
    }

    submit?.setAttribute('disable', 'true')
  }

  protected addEvents(): void {
    if (this.props.onSubmit) {
      // onSubmit form
      const submit = this._element?.querySelector('[type="submit"]')
      submit?.addEventListener('click', handleClick(this.id))
      const form = this._element?.querySelector('.' + styles.form) as HTMLFormElement
      form.addEventListener('submit', handleClick(this.id))
      form.addEventListener('keydown', handleKeyDown(this.id))
    }

    if (!Array.isArray(this.children.inputs)) return

    this.children.inputs.forEach((child) => this.addEventBlurInput(child))
  }

  protected removeEvents(): void {
    if (this.props.onSubmit) {
      // onSubmit form
      const submit = this._element?.querySelector('[type="submit"]')

      submit?.removeEventListener('click', handleClick(this.id))
      const form = this._element?.querySelector('.' + styles.form) as HTMLFormElement
      form.removeEventListener('submit', handleClick(this.id))
      form.removeEventListener('keydown', handleKeyDown(this.id))
    }
    if (!Array.isArray(this.children.inputs)) return

    this.children.inputs.forEach((child) => this.removeEventBlurInput(child))
  }

  protected componentDidMount(): void {
    this.handleDisable()
  }

  protected componentDidUpdate(oldProps: FormConstructorType, newProps: FormConstructorType): void {
    this.handleDisable()
  }

  protected render(): HTMLElement {
    const inputs = this.childrenHTML.lists.inputs || [<div></div>]
    // const submit = this.childrenHTML.lists.buttons.shift()
    // const buttons = this.childrenHTML.lists.buttons.length
    //   ? this.childrenHTML.lists.buttons
    //   : [<div></div>]

    console.log(this.props.validate)

    return (
      <div class={styles.block}>
        <form class={styles.form}>
          <div class={styles.form__inputs}>{...inputs}</div>
          <div class={styles.form__buttons}>
            <p class={this.props.error ? styles.form__error : 'hidden'}>{this.props.error}</p>
            {...this.childrenHTML.lists.buttons}
          </div>
        </form>
        {/* {<div class={styles.buttons}>{...buttons}</div>} */}
      </div>
    )
  }
}
