import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ModalDefault from '@/shared/modals/ModalDefault'
import Component from '@/core/Component'
import FormConstructorTitle from '@/shared/form/FormConstructorTitle'
import ButtonLoadFile from '@/shared/buttons/ButtonLoadFile'

interface LoadFileModalType {
  isOpen: boolean
  size?: Size
  onClose?: () => void
  form?: Component
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class LoadFileModal extends Component<LoadFileModalType> {
  constructor(props: LoadFileModalType) {
    props.form = new ModalDefault({
      background: 'dark',
      isOpen: props.isOpen,
      onOut: props.onClose,
      size: props.size,
      children: new FormConstructorTitle({
        title: 'Загрузить Файл',
        inputs: [new ButtonLoadFile({})],
        validate: {},
        buttons: [
          new ButtonConstructor({
            name: 'Загрузить',
            view: 'primary',
            events: {
              click: () => {},
            },
          }),
        ],
      }),
    })
    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.form}</div>
  }
}

/*
{new ModalDefault({
          background: 'dark',
          isOpen: this.props.isOpen,
          onOut: this.props.onClose,
          size: this.props.size,
          children: new FormConstructorTitle({
            title: 'Загрузить Файл',
            inputs: [new ButtonLoadFile({})],
            buttons: [
              new ButtonConstructor({
                name: 'Загрузить',
                view: 'primary',
                events: {
                  click: () => {},
                },
              }),
            ],
          }),
        }).getContent()}


        {new ModalDefault({
          background: 'dark',
          isOpen: this.props.isOpen,
          onOut: this.props.onClose,
          size: this.props.size,
          children: new FormConstructorTitle({
            title: 'Загрузить Файл',
            inputs: [new ButtonLoadFile({})],
            buttons: [
              new ButtonConstructor({
                name: 'Загрузить',
                view: 'primary',
                events: {
                  click: () => {},
                },
              }),
            ],
          }),
        }).getContent()}
*/
