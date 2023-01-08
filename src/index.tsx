
import SingIn from './modules/SingIn'


import './assets/styles/global.scss'
import './assets/styles/vars.scss'
import '@/assets/styles/reset.css'
import Search from './components/form/Search';
import Messanger from './pages/Messenger';


const root = document.querySelector('#root') as HTMLElement;



/*root.appendChild(SingIn({
   isOpen: true,
   size: {
      width: '340px',
      height: '460px'
   }
}))*/

root.appendChild(Messanger())

