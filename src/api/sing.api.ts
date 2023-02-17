import { SingInRequest, SingUpRequest, UserType } from '@/types/user'
import { HTTP } from '@/http/index'

const AuthHTTP = HTTP('/auth')

function statusCodeToBooleanResponse(status: number) {
  const string = String(status)
  let result = true
  if (string[0] === '4' || string[0] === '5') {
    result = false
  }

  return result
}

export class SingAPI {
  singin(data: SingInRequest): Promise<boolean> {
    return AuthHTTP.post('/signin', { data }).then((resp) =>
      statusCodeToBooleanResponse(resp.status)
    ) //resp.id)
  }

  singup(data: SingUpRequest): Promise<number> {
    return AuthHTTP.post('/signup', { data }).then((resp) => resp)
  }

  singout(): Promise<boolean> {
    return AuthHTTP.post('/logout').then((resp) => statusCodeToBooleanResponse(resp.status))
  }

  getUser(): Promise<UserType | null> {
    return AuthHTTP.get('/user').then((resp) => {
      if (!statusCodeToBooleanResponse(resp.status)) {
        return null
      }
      const user = JSON.parse(resp.response)

      if (typeof user !== 'object') {
        return null
      }
      return user
    })
  }
}

// export class SingUpAPI extends BaseAPI {
//   create(data?: any) {
//     return AuthHTTP.post('/singup', { data }).then((resp) => resp.id)
//   }
// }
