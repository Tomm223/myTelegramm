import { ValidateForm } from './types'

//login ^[a-zA-Z][a-zA-Z0-9-_\.]{6,20}$ ^[a-zA-Z0-9]+$
//name ^[A-zА-яЁё]{2,20}$
//pass /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
// email ^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$
// name /^[а-яА-Яa-zA-Z0-9]+$/
// phone /^[0-9\s]*$/
// email /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.
// [0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//email ^[^@s]+@[^@s]+.[^@s]+$

const RegName = /^[A-zА-яЁё]{2,20}$/
const RegLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/
const RegPhone = /^[0-9\s]*$/
const RegEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][az]{2,4}$/
const RegPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

function getvalidateFunc(reg: any, messageError: string) {
  console.log(reg)

  return (string: string) => {
    if (!string) {
      return 'Обязательное поле'
    }
    let re = reg
    let result = re.test(String(string))
    if (!result) {
      return messageError
    }
    return ''
  }
}

export const ValidatesForm = {
  login: getvalidateFunc(RegExp(RegLogin), 'Логин должен содержать латинские буквы, от 6 букв'),
  first_name: getvalidateFunc(RegExp(RegName), 'Имя от 2 до 20 букв'),
  second_name: getvalidateFunc(RegExp(RegName), 'Фамилия от 2 до 20 букв'),
  password: getvalidateFunc(
    RegExp(RegPassword),
    `Пароль должен содержать: cтрочные и прописные латинские буквы, 
      цифры, спецсимволы. Минимум 8 символов`
  ),
  email: getvalidateFunc(RegExp(RegEmail), 'Не корректный email'),
  phone: getvalidateFunc(RegExp(RegPhone), 'Не корректный номер телефона'),
}
