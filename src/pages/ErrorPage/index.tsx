import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Component from '@/core/Component'
import { useNavigate } from '@/core/routing'

interface ErrorType {
  numberError: number | undefined | null
  type: '400' | '500'
}

export default class ErrorPage extends Component<ErrorType> {
  protected render(): HTMLElement {
    const text = this.props.type === '400' ? 'Не туда попали' : 'Мы уже фиксим'

    return (
      <main class={styles.container}>
        <div class={styles.center}>
          <header class={styles.center__head}>
            <h3 class={styles.center__type}>{this.props.numberError}</h3>
            <p class={styles.text}>{text}</p>
          </header>
          <div class={styles.center__link}>
            {new ButtonConstructor({
              view: 'transparent',
              name: 'Назад к чатам',
              events: {
                click: () => {
                  useNavigate('/messanger')
                },
              },
            }).getContent()}
          </div>
        </div>
      </main>
    )
  }
}
