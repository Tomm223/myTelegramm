import { connect } from '@/store/connect'
import ProfileForm from './component'

function map(state: any) {
  return {
    user: state.user,
  }
}

export default connect(ProfileForm, map)
