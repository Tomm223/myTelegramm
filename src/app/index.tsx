import '@/styles/global.scss'
import '@/styles/vars.scss'
import '@/styles/reset.css'

import Router from './router'
import Nagivation from 'src/pages/Navigation'
import Messanger from 'src/pages/Messenger'
import ProfilePage from 'src/pages/ProfilePage'
import SingInPage from 'src/pages/SingInPage'
import SingUpPage from 'src/pages/SingUpPage'
import NoFound from 'src/pages/NoFound'
import ServerError from 'src/pages/ServerError'
import TestModal from 'src/pages/TestModal'

Router.use('/', Nagivation)
  .use('/messenger', Messanger)
  .use('/setting', ProfilePage)
  .use('/sing-in', SingInPage)
  .use('/sing-up', SingUpPage)
  .use('/no-found', NoFound)
  .use('/server-error', ServerError)
  .use('/test', TestModal)
  .start()
