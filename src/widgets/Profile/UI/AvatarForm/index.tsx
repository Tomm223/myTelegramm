import { connect } from '@/store/connect'
import AvatarForm from './component'

function map(state: any) {
  return { user: state.user }
}

export default connect(AvatarForm, map)
