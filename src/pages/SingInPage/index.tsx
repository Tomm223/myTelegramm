import Component from '@/core/Component'
import SingIn from '@/widgets/SingIn'
import CompileMaster from '@/core/CompileJSX'

interface SingInPageType {
  modal?: Component
}

export default class SingInPage extends Component<SingInPageType> {
  constructor(props: SingInPageType) {
    props.modal = new SingIn({
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
