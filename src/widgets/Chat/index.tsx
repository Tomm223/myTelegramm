import { connect } from '@/store/connect'
import Chat from './component'

function map(state: any) {
  const { chatID, token, loading } = state.chat
  const chat = { chatID, token, loading }
  return { chat }
}
export default connect(Chat, map)
