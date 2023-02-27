import Store from '../Store'

const store = new Store()

const setSingUpPageError = (error: string) => {
  const oldData = store.getState().sing_up
  store.set('sing_up', { ...oldData, error, loading: false })
}

const startLoadingSingUpPage = () => {
  const oldData = store.getState().sing_up
  store.set('sing_up', { ...oldData, loading: true })
}

const clearDataSingUpPage = () => {
  const oldData = store.getState().sing_up
  store.set('sing_up', { loading: false, error: '' })
}

export type SingUpActions = {
  setSingUpPageError: (error: string) => void
  startLoadingSingUpPage: () => void
  clearDataSingUpPage: () => void
}

const SingUpAct: SingUpActions = {
  clearDataSingUpPage,
  setSingUpPageError,
  startLoadingSingUpPage,
}

export default SingUpAct
