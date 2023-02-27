import { connect } from '@/store/connect'
import Header from './component'

function map(state: any) {
  const { avatar, title } = state.chat
  return { avatar, title }
}

export default connect(Header, map)
