import Component from '@/core/Component'
import SingUp from '@/widgets/SingUp'
import CompileMaster from '@/core/CompileJSX'
import { SingController } from '@/service/sing.service'

interface SingUnPageType {
  modal?: Component
}

export default class SingUnPage extends Component<SingUnPageType> {
  constructor(props: SingUnPageType) {
    const controller = new SingController()

    props.modal = new SingUp({
      size: { width: '340px', height: '615px' },
      onSubmit: controller.registration,
    })
    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
