
import SingIn from './pages/SingIn'


import '@/styles/global.scss'
import '@/styles/vars.scss'
import '@/styles/reset.css'
import Search from './components/form/Search';
import Messanger from './pages/Messenger';
import SingUp from './pages/SingUp';
import Profile from './pages/Profile';
import Error from './pages/Error';


const root = document.querySelector('#root') as HTMLElement;

console.log('path', window.location.pathname);

if (window.location.pathname.includes('messanger')) {
   root.innerHTML = ''
   root.appendChild(Messanger())
}
if (window.location.pathname.includes('singin')) {
   root.innerHTML = ''
   root.appendChild(SingIn({ size: { width: '340px', height: '460px' }, onSubmit: (form) => { } }))
}
if (window.location.pathname.includes('singup')) {
   root.innerHTML = ''
   root.appendChild(SingUp({ size: { width: '340px', height: '615px' }, onSubmit: (form) => { } }))
}
if (window.location.pathname.includes('profile')) {
   root.innerHTML = ''
   root.appendChild(Profile({}))
}
if (window.location.pathname === '/profile_1.html') {
   root.innerHTML = ''
   root.appendChild(Profile({ isEdit: true }))
}
if (window.location.pathname === '/profile_2.html') {
   root.innerHTML = ''
   root.appendChild(Profile({ isEditAvatar: true }))
}
if (window.location.pathname === '/profile_3.html') {
   root.innerHTML = ''
   root.appendChild(Profile({ isPassword: true }))
}
if (window.location.pathname == '/400') {
   root.innerHTML = ''
   root.appendChild(Error({ numberError: 404, type: '400' }))
}
if (window.location.pathname === '/500') {
   root.innerHTML = ''
   root.appendChild(Error({ numberError: 501, type: '500' }))
}

/*
1) доделать роутинг
2) привязать раздачу с express

недочеты:
1) меню на msgscreen летает а не стоит на месте
2) роутинг можно сделать более круче чем jf else
3) НАДО НАУЧИТЬСЯ ДЕЛАТЬ ОНКЛИК НА КНОПКИ А ТО НЕТ ПОЛНОГО РОУТИНГА
И ЭТО В БУДУШЕМ БУСТАНЕТ
4) доделать адаптив
5) кнопки которые transperent => это ссылки link to /* например как buttonConstructor(view:'transperent')
=== ButtonsProfileNavigate === link ===
6) переделать тк netlify ругается import * as styles
*/




