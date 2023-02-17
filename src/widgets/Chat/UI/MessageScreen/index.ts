import Store from '@/store/Store'
import { connect } from 'src/store/connect'
import MessageScreen from './component'

function map(state: any) {
  return {
    messages: state.chat.messages,
    loading: state.chat.loading,
  }
}

export default connect(MessageScreen, map)
