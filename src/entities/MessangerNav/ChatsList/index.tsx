import Actions from '@/store/Actions'
import { connect } from 'src/store/connect'
import ChatsList from './component'

function Map(state: any) {
  const { list, loading, isAll } = state.listChats
  const { chatID } = state.chat
  return { list, loading, isAll, chatIDSelected: chatID }
}
export default connect(ChatsList, Map)
