import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import { deepEqual } from '@/core/deepEqual'
import { EventBus } from '@/core/EventBus'
import { InputProfileEventBus, InputProfileEVENTS } from './eventbus'
import styles from './styles.module.scss'

interface InputProfileType {
  isEdit?: boolean
  name?: string
  label?: string
  text?: string
  type?: string
  error?: string
  style?: string
}

function handleChange(e: Event) {
  let input = e.target as HTMLInputElement
  InputProfileEventBus.emit(InputProfileEVENTS.CHANGE(input.id), input.value)
}

export default class InputProfile extends Component<InputProfileType> {
  intercaptorChange(value: string) {
    this.setProps({ text: value })
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    InputProfileEventBus.on(InputProfileEVENTS.CHANGE(this.id), this.intercaptorChange.bind(this))
  }

  protected addEvents(): void {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.addEventListener('change', handleChange)
  }

  protected removeEvents(): void {
    let input = this._element?.getElementsByTagName('input')[0] as HTMLInputElement
    input.addEventListener('change', handleChange)
  }

  protected render(): HTMLElement {
    console.log('render input')

    return (
      <div class={styles.itemList}>
        <p class={styles.b}>{this.props.text}</p>
        <div class={styles.block}>
          <label class={styles.label} for={this.props.name}>
            {this.props.label}
          </label>
          <input
            id={this.id}
            class={styles.input}
            type={this.props.type}
            name={this.props.name}
            disabled={!this.props.isEdit}
            value={this.props.text}
          />
        </div>
        <div class={`${this.props.error ? '' : 'hidden'}  ${styles.error}`}>
          {this.props.error ? this.props.error : ''}
        </div>
      </div>
    )
  }
}
