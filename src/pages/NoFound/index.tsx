import CompileMaster from '@/core/CompileJSX'
import Component from '@/core/Component'
import ErrorScreen from '@/entities/ErrorScreen'

interface NoFoundType {
  screen: Component
  numberError: number
}

export default class NoFound extends Component<NoFoundType> {
  constructor(props: NoFoundType) {
    props.screen = new ErrorScreen({
      numberError: props.numberError || 404,
      type: '400',
    })
    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.screen}</div>
  }
}
