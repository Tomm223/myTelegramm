### Practicum frontend: sprint_1

<hr/>
Description: Web chat messenger.

Commans:
npm run start = Starts local server at 3000 port
npm run build = Makes a build

Deployed example (Netlify) = https://admirable-semifreddo-be1b57.netlify.app/
Design template (Figma) = https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1

Реализация взаимодействия с сервером:

1. регистрация/авторизация
2. диномическая подгрузка списков чатов
3. realtime чат - отправка и прием сообщений
4. добавление/удаления пользователей из чатов (по IDшнику пользоватея)
5. редактирование данных пользователя
6. Создание чатов

Инструменты:

1. внедрил линты(eslint+stylelint), настроил .editorconfig

Функционал:

1. написал свой класс по работе с запросами src/api/index.ts
2. написал форм-конструктор, хотел что-то типо Formik
3. провалидировал все поля в формах
4. главное что сделал это написал копонент с методом "shouldComponentUpdate" как в PureComponent
