import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'

interface TestType {
  state?: Record<string, string>
}

export default class Test extends Component<TestType> {
  constructor(props: TestType) {
    props.state = {
      name: '',
      password: '',
    }
    super(props)
  }

  handleClick() {
    this.setProps({ state: { name: '123', password: '' } })
  }

  protected addEvents(): void {
    const btn = this._element?.getElementsByTagName('button')[0]

    btn?.addEventListener('click', this.handleClick.bind(this))
  }

  protected render(): HTMLElement {
    return (
      <div>
        <span>{JSON.stringify(this.props.state)}</span>
        <button>CLick</button>
      </div>
    )
  }
}
