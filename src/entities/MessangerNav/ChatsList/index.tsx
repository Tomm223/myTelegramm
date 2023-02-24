import Actions from '@/store/Actions'
import { connect } from 'src/store/connect'
import ChatsList from './component'

function Map(state: any) {
  const { list, loading } = state.listChats
  return { list, loading }
}
export default connect(ChatsList, Map)
