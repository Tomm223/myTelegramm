import Component from '@/core/Component'
import SingUp from '@/widgets/SingUp'
import CompileMaster from '@/core/CompileJSX'
<<<<<<< HEAD
=======
import { SingController } from '@/service/sing.service'
>>>>>>> sprint_3

interface SingUnPageType {
  modal?: Component
}

export default class SingUnPage extends Component<SingUnPageType> {
  constructor(props: SingUnPageType) {
<<<<<<< HEAD
    props.modal = new SingUp({
      size: { width: '340px', height: '615px' },
      onSubmit: (form) => {},
=======
    const controller = new SingController()

    props.modal = new SingUp({
      size: { width: '340px', height: '615px' },
      onSubmit: controller.registration,
>>>>>>> sprint_3
    })
    super(props)
  }

  protected render(): HTMLElement {
<<<<<<< HEAD
    console.log('page render')

=======
>>>>>>> sprint_3
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
