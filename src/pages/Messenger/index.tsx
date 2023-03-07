import { connect } from '@/store/connect'
import Messenger from './component'

function map(state: any) {
  const { chatID, token } = state.chat
  return {
    chatID,
    token,
  }
}

export default connect(Messenger, map)
