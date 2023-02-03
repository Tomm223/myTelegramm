import Component from '@/core/Component'
import SingUp from '@/widgets/SingUp'
import CompileMaster from '@/core/CompileJSX'

interface SingUnPageType {
  modal?: Component
}

export default class SingUnPage extends Component<SingUnPageType> {
  constructor(props: SingUnPageType) {
    props.modal = new SingUp({
      size: { width: '340px', height: '615px' },
      onSubmit: (form) => {},
    })
    super(props)
  }

  protected render(): HTMLElement {
    console.log('page render')

    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
