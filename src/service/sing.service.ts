import { SingAPI } from '@/api/sing.api'
import { useValidation } from '@/shared/form/FormConstructor/validates.reg'
import Actions from '@/store/Actions'
import { SingInRequest, SingUpRequest, UserType } from '@/types/user'
import { ValidateSingIn } from '@/widgets/SingIn/constants'
import { ValidateSingUp } from '@/widgets/SingUp/constants'
import Router from 'src/app/router'

export class SingController {
  public async getUser() {
    try {
      const api = new SingAPI()
      const user = await api.getUser()
      if (!user) {
        throw new Error()
      }
      return user
    } catch {
      throw new Error()
    }
  }

  public async logout() {
    try {
      const api = new SingAPI()
      const status = await api.singout()

      if (!status) {
        throw new Error('')
      }

      Actions.resetStore()
      Router.go('/sing-in')

      return true
    } catch (e) {
      alert('Error Logout Service Frontend')
      return false
    }
  }

  public async login(data: SingInRequest) {
    try {
      Actions.startLoadingSingInPage()

      const validateData = useValidation(data, ValidateSingIn)

      if (!validateData) {
        throw new Error('FormData don`t valid')
      }
      const api = new SingAPI()

      const status = await api.singin(data)

      if (!status) {
        throw new Error()
      }

      const userData = await api.getUser()

      if (!userData) {
        throw new Error()
      }
      Actions.setUser(userData)
      Actions.clearDataSingInPage()
      Router.go('/messenger')
    } catch (error) {
      // Логика обработки ошибок
      console.log(error)

      Actions.setSingInPageError('Неверный логин или пароль')
    }
  }

  public async registration(data: SingUpRequest) {
    try {
      Actions.startLoadingSingUpPage()

      const validateData = useValidation(data, ValidateSingUp)

      if (!validateData) {
        throw new Error('FormData don`t valid')
      }
      const api = new SingAPI()

      const userID = await api.singup(data)

      if (!userID) {
        throw new Error('')
      }

      const userData = await api.getUser()

      if (!userData) {
        throw new Error()
      }
      Actions.setUser(userData)
      Actions.clearDataSingUpPage()
      Router.go('/messenger')
    } catch (error) {
      // Логика обработки ошибок
      console.log(error)
      Actions.setSingUpPageError('Ошибка')
    }
  }
}

/*
{
  "first_name": "Daniil",
  "second_name": "Osipov",
  "login": "Daniil",
  "email": "dan.osipov99@mail.ru",
  "password": "Dancsgo1337.",
  "phone": "89539005656"
}
{"email":"nmkmkmk@kmmk.ru",
"login":"kjmf",
"first_name":"Ssdfd",
"second_name":"Mdfd",
"password":"MKMKmk34343...",
"phone":"493534534576756"
}
*/
