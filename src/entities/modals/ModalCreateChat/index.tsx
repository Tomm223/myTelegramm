import Component from '@/core/Component'
import CompileMaster from '@/core/CompileJSX'
import ModalFormDefault from '@/shared/modals/ModalFormDefault'
import InputText from '@/shared/inputs/InputText'

interface ModalCreateChatType {
  isOpen?: boolean
  size?: Size
  createChat?: (data: Record<string, any>) => void
}

interface Size {
  width?: string
  height?: string
  borderRadius?: string
}

export default class ModalCreateChat extends Component<ModalCreateChatType> {
  protected init(): void {
    this.children.modal = new ModalFormDefault({
      inputs: [new InputText({ label: 'Имя чата', name: 'create_chat' })],
      isOpen: this.props.isOpen,
      onSubmit: this.props.createChat,
      title: 'Создать новый чат',
      size: this.props.size,
    })
  }

  protected componentDidUpdate(oldProps: ModalCreateChatType, newProps: ModalCreateChatType): void {
    const newIsOpen = newProps.isOpen
    const oldIsOpen = oldProps.isOpen

    if (newIsOpen) {
      const modal = this.children.modal as Component
      modal.setProps({ isOpen: true })
    }
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.modal}</div>
  }
}
