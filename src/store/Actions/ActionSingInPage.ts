import Store from '../Store'

const store = new Store()

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
  setSingInPageError: (error: string) => void
  startLoadingSingInPage: () => void
  clearDataSingInPage: () => void
}

const SingInAct: SingInActions = {
  clearDataSingInPage,
  setSingInPageError,
  startLoadingSingInPage,
}

export default SingInAct
