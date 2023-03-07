import Store from '../Store'

const store = new Store()

const resetStore = () => {
  store.removeState()
}

const setSingInPageError = (error: string) => {
  const oldData = store.getState().sing_in
  store.set('sing_in', { ...oldData, error, loading: false })
}

const startLoadingSingInPage = () => {
  const oldData = store.getState().sing_in
  store.set('sing_in', { ...oldData, loading: true })
}

const clearDataSingInPage = () => {
  const oldData = store.getState().sing_in
  store.set('sing_in', { loading: false, error: '' })
}

export type SingInActions = {
  resetStore: () => void
  setSingInPageError: (error: string) => void
  startLoadingSingInPage: () => void
  clearDataSingInPage: () => void
}

const SingInAct: SingInActions = {
  resetStore,
  clearDataSingInPage,
  setSingInPageError,
  startLoadingSingInPage,
}

export default SingInAct
