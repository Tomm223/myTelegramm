import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import LoadFileModal from '@/entities/modals/LoadFileModal'
import { connect } from 'src/store/connect'
import Store from 'src/store/Store'
import Actions from '@/store/Actions'
import store from 'src/store'

interface TestModaltype {
  modal?: Component
  fdfd?: string
}

function Map(state: any) {
  return {
    search: state.search,
  }
}

class TestModal extends Component<TestModaltype> {
  constructor(props: TestModaltype) {
    props.fdfd = 'dddddddddddddd'
    props.modal = new LoadFileModal({
      accepting: 'images',
      inputName: 'fff',
      isOpen: true,
      size: {
        height: '300px',
        width: '315px',
      },
    })
    super(props)
  }

  protected addEvents(): void {
    let btn = this._element?.getElementsByTagName('button')[0] as HTMLButtonElement
    btn.addEventListener('click', () => Actions.s('fdfd'))
  }

  protected shouldComponentUpdate(oldProps: TestModaltype, newProps: TestModaltype): boolean {
    console.log(oldProps, newProps)
    return true
  }

  protected render(): HTMLElement {
    console.log(this.props.fdfd)
    // console.log(Store.getState())
    return (
      <div>
        {this.props.fdfd}
        <button>Click</button>
        {/* {this.props.fdfd} */}
        {/* {this.childrenHTML.elements.modal} */}
      </div>
    )
  }
}

export default connect(TestModal, Map)
