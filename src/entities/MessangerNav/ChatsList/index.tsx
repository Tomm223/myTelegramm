import { connect } from 'src/store/connect'
import ChatsList from './component'

function Map(state: any) {
  return { list: state.listChats }
}
export default connect(ChatsList, Map)
