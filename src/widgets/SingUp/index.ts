import { connect } from '@/store/connect'
import SingUp from './component'

function map(state: any) {
  const { error, loading } = state.sing_up
  return {
    loading,
    error,
  }
}
export default connect(SingUp, map)
