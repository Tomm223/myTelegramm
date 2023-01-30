### Practicum frontend: sprint_1

<hr/>
Description: Web chat messenger.

Commans:
npm run start = Starts local server at 3000 port
npm run build = Makes a build

Deployed example (Netlify) = https://admirable-semifreddo-be1b57.netlify.app/
Design template (Figma) = https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1

TASKS:

NOT ПЕРЕЗАГРУ = при нажатии на импут срабатывает getContent

0. jsx-fragmnt как сделать?
1. за счет чего осуществляется ререндер?
2. сделать маску на инпут телефона?
3. заменить нейм файла model на eventbus
4. поискать мб в вебинаре есть инфа про дидАпдейт
5. !!!!!проверить и сделать нормальный deepEquil для didUpDate

1) profile:
   form: сделать прозрачную форму регулирует isEdit + profile/password
   props:{ profile,password, btnEdit btnNav }
   change: setProps({isEdit:true}) || setProps({isPassword:false})
   пример: btnNav:[{new NavBtn({ events:{click: () => {} } })}]
