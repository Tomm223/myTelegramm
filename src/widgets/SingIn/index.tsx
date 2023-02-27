import { InitialStateType } from '@/store/Store'
import { connect } from 'src/store/connect'
import SingIn from './component'

function map(state: any) {
  const { error, loading } = state.sing_in
  console.log(error)

  return {
    loading,
    error,
  }
}
export default connect(SingIn, map)
