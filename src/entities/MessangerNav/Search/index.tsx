import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import ButtonSearch from './UI/button'
import InputSearch from './UI/input'
import { EventBus } from '@/core/EventBus'
import { EVENTS, SearchEventBus } from './eventbus'
import { debounce } from '@/utils/debounce'
<<<<<<< HEAD
import { ChatListEventBus, ChatListEVENTS } from '../ChatsList/eventbus'
=======
>>>>>>> sprint_3

interface SearchType {
  inputName?: string
  isFocus?: boolean
  button?: Component
  input?: Component
  onChange?: (value: string) => void
}

function handleVisible(e: MouseEvent) {
  e.preventDefault()
  SearchEventBus.emit(EVENTS.VISIBLE, e)
}

function handleBlur(e: FocusEvent) {
  let input = e.target as HTMLInputElement
  if (!input.value) {
    SearchEventBus.emit(EVENTS.VISIBLE, e)
  }
}

export default class Search extends Component<SearchType> {
  constructor(props: SearchType) {
    props.isFocus = false
    props.button = new ButtonSearch({ events: { click: handleVisible } })
    props.input = new InputSearch({
      name: props.inputName || '',
      events: {
        keyup: debounce((e) => SearchEventBus.emit(EVENTS.INPUT_ON_CHANGE, e), 300),
        blur: handleBlur,
      },
    })

    super(props)
  }

  onFocus() {
    if (this.props.isFocus === true) {
      this.setProps({ isFocus: false })
    } else {
      this.setProps({ isFocus: true })
    }
  }

  onInputChange(e: Event) {
    let input = e.target as HTMLInputElement
<<<<<<< HEAD
    console.log(input)
    ChatListEventBus.emit(ChatListEVENTS.TO_FILTER, input.value)
=======

    if (this.props.onChange) {
      this.props.onChange(input.value)
    }
>>>>>>> sprint_3
  }

  protected registerEvents(
    eventBus: EventBus<Record<string, string>, Record<string, any[]>>
  ): void {
    SearchEventBus.on(EVENTS.VISIBLE, this.onFocus.bind(this))
    SearchEventBus.on(EVENTS.INPUT_ON_CHANGE, this.onInputChange.bind(this))
  }

  toFocus() {
    if (this.props.isFocus && !Array.isArray(this.children.input)) {
      let input = this._element?.getElementsByTagName('input')[0]
      input?.focus()
    }
  }

  protected componentDidMount(): void {
    this.toFocus()
  }

  protected componentDidUpdate(): void {
<<<<<<< HEAD
    console.log('open')
=======
>>>>>>> sprint_3
    this.toFocus()
  }

  protected render(): HTMLElement {
    if (this.props.isFocus) {
      return (
        <form class={styles.form_active}>
          {/* {this.childrenHTML.elements.input} */}
          {new InputSearch({
            name: this.props.inputName || '',
            events: {
              keyup: debounce((e) => SearchEventBus.emit(EVENTS.INPUT_ON_CHANGE, e), 300),
              blur: handleBlur,
            }, //keyup: handleChange
          }).getContent()}
        </form>
      )
    }

    return <form class={styles.form}>{this.childrenHTML.elements.button}</form>
  }
}
