import Actions from '@/store/Actions'
import { connect } from 'src/store/connect'
import ChatsList from './component'

function Map(state: any) {
  const { list, loading, isAll, offset } = state.listChats
  console.log('offset', offset)

  return { list, loading, isAll }
}
export default connect(ChatsList, Map)
