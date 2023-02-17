import { UserType } from '@/types/user'
import Store from '../Store'

const store = new Store()

// const getUserId = () => {
//   return store.getState().user.id
// }
// const setUserId = (id: number) => {
//   store.set('user_id', id)
// }

const getIsAuth = () => {
  return store.getState().isAuth
}
const setIsAuth = (bool: boolean) => {
  store.set('isAuth', bool)
}

const setUser = (user: UserType) => {
  store.set('user', user)
  setIsAuth(true)
}
const resetUser = () => {
  store.set('user', null)
  setIsAuth(false)
}
const getUser = () => {
  return store.getState().user
}

export type UserActType = {
  getIsAuth: () => boolean
  setUser: (user: UserType) => void
  resetUser: () => void
  getUser: () => UserType | null
}

const userAct: UserActType = {
  resetUser,
  setUser,
  getUser,
  getIsAuth,
}

export default userAct
