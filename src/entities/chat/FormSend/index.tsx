import ButtonArrow from '@/shared/buttons/ButtonArrow'
import ButtonAttach from '@/shared/buttons/ButtonAttach'
import InputMessage from '@/shared/inputs/InputMessage'
import CompileMaster from '@/core/CompileJSX'
import Component from '@/utils/Component'
import Photo from '@/static/icons/pics_message.svg'
import File from '@/static/icons/file.svg'
import Local from '@/static/icons/local.svg'
import styles from './styles.module.scss'
import { throtlle } from '@/utils/throtlle'
import { FormSendEventBus } from './eventbus'
import { debounce } from '@/utils/debounce'
import MenuChat from '../MenuChat'
import ButtonMenu from '../MenuChat/ButtonMenu'

interface FormSendType {
  events?: any
  refs?: any
  isOpen?: boolean
  attach_btn?: Component
  attach?: Component
  btn?: Component
  input?: Component
}

export default class FormSend extends Component<FormSendType> {
  constructor(props: FormSendType) {
    props.events = {
      mousemove: throtlle((e: MouseEvent) => {
        if (this.refs['menu']) {
          let rect = this.refs['menu'].getBoundingClientRect()
          let mouse = `${e.clientX} and ${e.clientY}`
        }
      }, 500),
      mouseout: debounce((e: MouseEvent) => {
        console.log('close')
        if (this.props.isOpen) {
          //this.setProps({ isOpen: false })
        }
      }, 500),
    }
    props.isOpen = false
    props.input = new InputMessage({ name: 'message', placeholder: 'Сообщение' })
    props.btn = new ButtonArrow({
      onClick: () => {
        console.log('send')
      },
    })
    props.attach_btn = new ButtonAttach({
      events: {
        click: function () {
          FormSendEventBus.emit('menu-click')
        },
      },
    })
    props.attach = new MenuChat({
      ref: 'menu',
      buttons: [
        new ButtonMenu({
          img: Photo,
          text: 'Фото или Видео',
          events: { click: () => {} },
        }),
        new ButtonMenu({
          img: File,
          text: 'Файл',
          events: { click: () => {} },
        }),
        new ButtonMenu({
          img: Local,
          text: 'Локация',
          events: { click: () => {} },
        }),
      ],
    })
    super(props)
  }

  protected componentDidMount(): void {
    alert('didmount')
  }

  protected init(): void {
    FormSendEventBus.on('menu-click', () => {
      if (this.props.isOpen) {
        this.setProps({ isOpen: false })
      } else {
        this.setProps({ isOpen: true })
      }
    })
  }

  protected render(): HTMLElement {
    FormSendEventBus.log()

    return (
      <div class={styles.container}>
        <div class={styles.block}>
          {this.childrenHTML.elements.attach_btn}
          <form class={styles.form}>
            {this.childrenHTML.elements.input}
            {this.childrenHTML.elements.btn}
          </form>
          <div class={this.props.isOpen ? styles.menu_active : styles.menu}>
            {this.childrenHTML.elements.attach}
          </div>
        </div>
      </div>
    )
  }
}
