import { UserAPI } from '@/api/user.api'
import Actions from '@/store/Actions'
import { SetPasswordRequest, UserType } from '@/types/user'

export class UserController {
  public async getUserById(id: number) {
    const api = new UserAPI()
    const userData = await api.getUserById(id)

    return userData
  }

  public async setProfile(user: UserType): Promise<boolean> {
    try {
      const api = new UserAPI()
      const userData = await api.setProfile(user)
      if (!userData) {
        throw new Error('error response')
      }
      Actions.setUser(userData)

      return true
    } catch {
      alert('Error SetProfile Service Frontend')

      return false
    }
  }

  public async setAvatar(data: FormData): Promise<boolean> {
    try {
      const api = new UserAPI()
      const userData = await api.setAvatar(data)

      if (!userData) {
        throw new Error('error response')
      }
      Actions.setUser(userData)
      return true
    } catch {
      alert('Error SetAvatar Service Frontend')
      return false
    }
  }

  public async setPassword(user: SetPasswordRequest): Promise<boolean> {
    try {
      const api = new UserAPI()
      const status = await api.setPassword(user)

      if (!status) {
        throw new Error('error response')
      }
      return true
    } catch {
      alert('Error SetPass Service Frontend')
      return false
    }
  }
}
