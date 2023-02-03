import '@/styles/global.scss'
import '@/styles/vars.scss'
import '@/styles/reset.css'

import { renderDOM } from '../core/renderDOM'

import Router from './routes'

function handlerNavigate() {
  const query = window.location.search
  const pathname = window.location.pathname
  Router({ pathname, query })
}

window.addEventListener('DOMContentLoaded', (e: Event) => {
  console.log('ready', e)
  handlerNavigate()
})

window.addEventListener('popstate', (e: Event) => {
  e.preventDefault()
  handlerNavigate()
})
