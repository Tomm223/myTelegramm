import Actions from '@/store/Actions'
import { connect } from 'src/store/connect'
import ChatsList from './component'

function Map(state: any) {
  const { list, loading, isAll } = state.listChats
  return { list, loading, isAll }
}
export default connect(ChatsList, Map)
