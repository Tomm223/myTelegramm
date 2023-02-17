import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import ErrorScreen from '@/widgets/ErrorScreen'

interface ServerErrorType {
  screen?: Component
  numberError?: number
}

export default class ServerError extends Component<ServerErrorType> {
  constructor(props: ServerErrorType) {
    props.screen = new ErrorScreen({
      numberError: props.numberError || 500,
      type: '500',
    })
    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.screen}</div>
  }
}
