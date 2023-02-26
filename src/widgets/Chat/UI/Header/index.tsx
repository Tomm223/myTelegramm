import { connect } from '@/store/connect'
import Header from './component'

function map(state: any) {
  const { chatID, token, messages, loading } = state.chat
  return {}
}

export default connect(Header, map)
