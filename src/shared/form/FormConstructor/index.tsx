import Component from '@/utils/Component'
import { deepEqual } from '@/utils/deepEqual'
import CompileMaster from '../../../core/CompileJSX'
import { EVENTS, FormConstrEventBus } from './eventbus'
import styles from './styles.module.scss'
import { ValidateForm } from './types'

export interface FormConstructorType {
  ref?: string
  state?: Record<string, string>
  inputs?: Component[]
  buttons?: Component[]
  onSubmit?: (data: Record<string, string>) => void
  validate?: ValidateForm
}

export default class FormConstructor extends Component<FormConstructorType> {
  handlerBlur(e: FocusEvent) {
    if (!this.props.validate) return

    let input = e.target as HTMLInputElement
    let name = input.name

    let condidateError = this.props.validate[name](input.value)
    let oldState = this.props.state

    this.setProps({ state: { ...oldState, [name]: condidateError } })
  }

  handlerSubmit(e: SubmitEvent) {
    alert('SUBMIT')
    if (!this.props.state) return
    if (!this.props.onSubmit) return

    let values = Object.values(this.props.state)
    for (const value in values) {
      if (value) {
        return
      }
    }
    const form = e.target as HTMLFormElement
    let result = {} as Record<string, string>
    Object.keys(this.props.state).forEach((key) => {
      result[key] = form[key].value
    })
    this.props.onSubmit(result)
  }

  protected addEvents(): void {
    if (this.props.onSubmit) {
      // onSubmit form
      // let form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
      // if (!form) return
      // form.removeEventListener('submit', this.handleSubmit)
    }
    if (!this.props.state) return
    if (!this.props.validate) return
    // onBlur validate input
    if (!this._element) return
    let allInputs = [...this._element?.getElementsByTagName('input')]
    let result = {} as any
    allInputs.forEach((input) => {
      let name = input.name

      if (!this.props.state || !this.props.state.hasOwnProperty(name)) {
        throw new Error(`state and inputs dont match: state dont have '${name}'  properties`)
      }

      result[name] = input
      input.addEventListener('blur', this.handlerBlur.bind(this))
    })
  }

  protected removeEvents(): void {
    if (this.props.onSubmit) {
      // onSubmit form
      // let form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
      // if (!form) return
      // form.removeEventListener('submit', this.handleSubmit)
    }
    if (!this.props.state) return
    if (!this.props.validate) return
    // onBlur validate input
    // const form = this._element?.getElementsByTagName('form')[0] as HTMLFormElement
    if (!this._element) return
    let allInputs = [...this._element?.getElementsByTagName('input')]
    let result = {} as any
    allInputs.forEach((input) => {
      let name = input.name

      if (!this.props.state || !this.props.state.hasOwnProperty(name)) {
        console.log(this.props.state)

        throw new Error(`state and inputs dont match: state dont have '${name}'  properties`)
      }
      result[name] = input
      input.removeEventListener('blur', this.handlerBlur.bind(this))
    })
  }

  alertError() {
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((children) => {
          if (!this.props.state) return
          children.setProps({ error: this.props.state[children.props.name] })
        })
      } else {
        if (!this.props.state) return
        child.setProps({ error: this.props.state[child.props.name] })
      }
    })
  }

  protected shouldComponentUpdate(
    oldProps: FormConstructorType,
    newProps: FormConstructorType
  ): boolean {
    return true
  }

  protected componentDidMount(): void {
    this.alertError()
  }

  protected componentDidUpdate(oldProps: FormConstructorType, newProps: FormConstructorType): void {
    console.log('update form')

    if (!deepEqual(oldProps.state, newProps.state)) {
      this.alertError()
    }
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        {/* { <h3 class={styles.title}>{this.props.title}</h3>} */}
        <form class={styles.form}>
          <div class={styles.inputs}>{...this.childrenHTML.lists.inputs}</div>
          <div class={styles.buttons}>{...this.childrenHTML.lists.buttons}</div>
        </form>
      </div>
    )
  }
}
