import ChatNav, { NavType } from './ActionsChatNav'
import Chat, { ActionChat } from './ActionsChat'
// import ChatManage from './ActionsChatManage'
import User, { UserActType } from './ActionsUser'
import SingInAct, { SingInActions } from './ActionSingInPage'
import SingUpAct, { SingUpActions } from './ActionSingUpPage'

type ActionType = NavType & ActionChat & UserActType & SingInActions & SingUpActions

const Actions: ActionType = {
  ...ChatNav,
  ...Chat,
  ...User,
  ...SingInAct,
  ...SingUpAct,
}

export default Actions
