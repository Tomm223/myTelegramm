import Component from '@/core/Component'
import SingIn from '@/widgets/SingIn'
import CompileMaster from '@/core/CompileJSX'
<<<<<<< HEAD
=======
import TestModal from '../TestModal'
import { SingController } from '@/service/sing.service'
>>>>>>> sprint_3

interface SingInPageType {
  modal?: Component
}

export default class SingInPage extends Component<SingInPageType> {
  constructor(props: SingInPageType) {
<<<<<<< HEAD
    props.modal = new SingIn({
      size: { width: '340px', height: '615px' },
      onSubmit: (form) => {},
=======
    const controller = new SingController()
    props.modal = new SingIn({
      size: { width: '340px', height: '615px' },
      onSubmit: controller.login,
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
