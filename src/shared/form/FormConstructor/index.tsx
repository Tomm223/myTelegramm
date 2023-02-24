import Component from '@/core/Component'
import { deepEqual } from '@/core/deepEqual'
import { EventBus } from '@/core/EventBus'
import CompileMaster from '../../../core/CompileJSX'
import { FormConstrEventBus, FormConstrEVENTS } from './eventbus'
import styles from './styles.module.scss'
import { ValidateForm } from './types'

export interface FormConstructorType {
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
    let inp = child._element?.getElementsByTagName('input')[0] as HTMLInputElement
    inp.addEventListener('blur', handleBlur(this.id))
  }

  removeEventBlurInput(child: Component) {
    let inp = child._element?.getElementsByTagName('input')[0] as HTMLInputElement
    inp.removeEventListener('blur', handleBlur(this.id))
  }

  public resetForm() {
    let childs = this.children.inputs as Component[]
    for (const i in childs) {
      childs[i].props.error = ''
    }
    for (const i in childs) {
      const input = childs[i]._element?.getElementsByTagName('input')[0] as HTMLInputElement
      input.value = ''
    }
  }

  handlerSubmit() {
    if (!this._element) return
    if (!this.props.onSubmit) return

    if (!this.isValidForm()) return

    let inputs = this._element.getElementsByTagName('input')

    let result = {} as Record<string, string>
    for (let i = 0; i < inputs.length; i++) {
      result[inputs[i].name] = inputs[i].value
    }
    this.props.onSubmit(result)
  }

  isValidForm(): boolean {
    let childs = this.children.inputs as Component[]
    for (const i in childs) {
      if (childs[i].props.error) {
        return false
      }
    }
    let inputs = this._element?.getElementsByTagName('input')

    for (const i in inputs) {
      if (typeof inputs[i] === 'object' && !inputs[i].value) {
        return false
      }
    }

    return true
  }

  public resetFormEvents() {
    if (this.props.onSubmit) {
      // onSubmit form
      let submit = this._element?.querySelector('[type="submit"]')

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
      let submit = this._element?.querySelector('[type="submit"]')
      submit?.addEventListener('click', handleClick(this.id))
    }

    if (!Array.isArray(this.children.inputs)) return

    this.children.inputs.forEach((child) => this.addEventBlurInput(child))
  }

  protected removeEvents(): void {
    if (this.props.onSubmit) {
      // onSubmit form
      let submit = this._element?.querySelector('[type="submit"]')

      submit?.removeEventListener('click', handleClick(this.id))
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
    return (
      <div class={styles.block}>
        <form class={styles.form}>
          <div class={styles.inputs}>{...this.childrenHTML.lists.inputs}</div>
          <div class={styles.buttons}>
            <p class={this.props.error ? styles.error : 'hidden'}>{this.props.error}</p>
            {...this.childrenHTML.lists.buttons}
          </div>
        </form>
      </div>
    )
  }
}
