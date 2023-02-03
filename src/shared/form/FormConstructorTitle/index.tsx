import Component from '@/core/Component'
import FormConstructor, { FormConstructorType } from '../FormConstructor'
import styles from './styles.module.scss'
import CompileMaster from '@/core/CompileJSX'

interface FormConstructorTitleType extends FormConstructorType {
  title: string
  constructo?: Component
}

export default class FormConstructorTitle extends Component {
  constructor(props: FormConstructorTitleType) {
    let propsForCostructor = { ...props, title: undefined, constructor: undefined }
    props.constructo = new FormConstructor({
      ...propsForCostructor,
    })

    super(props)
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.block}>
        <div class={styles.title}>
          <h3>{this.props.title}</h3>
        </div>
        {this.childrenHTML.elements.constructo}
      </div>
    )
  }
}
