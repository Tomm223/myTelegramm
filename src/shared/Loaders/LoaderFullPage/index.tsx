import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface LoaderFullPageType {
  isShow: boolean
}

export default class LoaderFullPage extends Component<LoaderFullPageType> {
  protected render(): HTMLElement {
    return (
      <div class={this.props.isShow ? styles.block : 'hidden'}>
        <span class="hidden">dfdfd</span>
      </div>
    )
  }
}
