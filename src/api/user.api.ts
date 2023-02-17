import { SingInRequest, SingUpRequest, UserType } from '@/types/user'
import { HTTP } from '@/http/index'

const UserHTTP = HTTP('/user')

export class UserAPI {
  getUserById(id: number): Promise<UserType> {
    return UserHTTP.get(`/${id}`).then((resp) => JSON.parse(resp.response))
  }
}
