//api
class LoginAPI extends BaseAPI {
  public request(user: LoginRequest) {
    return authAPIInstance
      .post<LoginRequest, LoginResponse>('/login', user)
      .then(({ user_id }) => user_id) // Обрабатываем получение данных из сервиса далее
  }
}
// somewhere/in/types/file.ts

interface LoginFormModel {
  email: string
  password: string
}

// controllers/user-login.ts

const loginApi = new LoginAPI()
const userLoginValidator = validateLoginFields(validateRules)

class UserLoginController {
  public async login(data: LoginFormModel) {
    try {
      // Запускаем крутилку

      const validateData = userLoginValidator(data)

      if (!validateData.isCorrect) {
        throw new Error(validateData)
      }
      let api = new LoginAPI()
      const userID = api.  .request(prepareDataToRequest(data))

      RouteManagement.go('/chats')

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}
// service с декораторами
class UserLoginController {
  @validate(userLoginValidateRules)
  @handleError(handler)
  public async login(data: LoginFormModel) {
    const userID = loginApi.request(prepareDataToRequest(data))
    RouteManagement.go('/chats')
  }
}

// Работа с файлами через input type=file

const myUserForm = document.getElementById('myUserForm')

myUserForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const avatar = document.getElementById('avatar')
  const form = new FormData(myUserForm) // content-type: multipart/form-data

  // Можете добавлять свои дополнительные поля или составлять данные полностью из пустой FormData
  // Если хотите назвать файлы как-то иначе, третий параметр по-вашему усмотрению
  // form.append('avatar', avatar, 'my-file-name.png');

  fetch(`${host}/api/v2/user/profile/avatar`, {
    method: 'PUT',
    credentials: 'include', // Нам нужно подставлять cookies
    mode: 'cors', // Работаем с CORS
    body: form, // content-type: multipart/form-data
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
})

// wss
//////////////////////////////wss://ya-praktikum.tech/ws/chats/308636/4054/b2a3de4d397be57498879.........
const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>')

// получение токена для подключения к websocket для прослушивания сообщений
fetch(`${host}/api/v2/chats/token/1`, {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
})
  .then((response) => response.json())
  .then((data) => {
    console.log('token', data.token) // Получаем строку
  })

// обработка сокета

socket.addEventListener('open', () => {
  console.log('Соединение установлено')

  socket.send(
    JSON.stringify({
      content: 'Моё первое сообщение миру!',
      type: 'message',
    })
  )
})

socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто')
  } else {
    console.log('Обрыв соединения')
  }

  console.log(`Код: ${event.code} | Причина: ${event.reason}`)
})

socket.addEventListener('message', (event) => {
  console.log('Получены данные', event.data)
})

socket.addEventListener('error', (event) => {
  console.log('Ошибка', event.message)
})

// tests ~$ npm install --save-dev mocha @types/mocha chai @types/chai
// config .mocharc.json
// {
//    "extension": ["ts"],
//    "spec": "test/**/*.spec.ts",
//    "require": "test/babel-register.js"
// }
// run ~$ ./node_modules/.bin/mocha  || npx mocha src/
