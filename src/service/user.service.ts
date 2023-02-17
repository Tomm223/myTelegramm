import { UserAPI } from '@/api/user.api'

export class UserController {
  public async getUserById(id: number) {
    const api = new UserAPI()
    const userData = await api.getUserById(id)

    return userData
  }
}
