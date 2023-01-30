import SingIn from './pages/SingInPage'

const Routes = {
  messager: '/',
  singin: '/singin',
  singup: '/singin',
  profile: '/profile',
}

interface Routes {
  pathname: string
}
export default ({ pathname }: Routes) => {
  const pages = {
    'sing-in': SingIn({ size: { width: '340px' }, onSubmit: (form) => {} }),
  }

  const [path] = pathname.split('/').slice(1)

  if (Object.keys(pages).includes(path)) {
    return pages[path]
  } else {
    pages[404] || pages[500]
  }
}
