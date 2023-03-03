import { connect } from '@/store/connect'
import AvatarForm from './component'

function map(state: any) {
  return { first_name: state.user.first_name, avatar: state.user.avatar }
}

export default connect(AvatarForm, map)
