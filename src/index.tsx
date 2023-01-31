import SingIn from './pages/SingInPage'

import '@/styles/global.scss'
import '@/styles/vars.scss'
import '@/styles/reset.css'

import Messanger from './pages/Messenger'
import SingUp from './pages/SingUpPage'
import Profile from './pages/ProfilePage'
import Error from './pages/Error'
import { renderDOM } from './utils/renderDOM'
import SingUnPage from './pages/SingUpPage'
import SingInPage from './pages/SingInPage'
import Test from './pages/Test'
import CompileMaster from '@/core/CompileJSX'
import ProfilePage from './pages/ProfilePage'
// import NextComp, { Buttonik } from './pages/Component';
// import CompileMaster from '@/core/CompileJSX'
// import Nav from './pages/Component/nav';
// import { renderDOM } from './pages/Component/renderDOM';

const root = document.querySelector('#root') as HTMLElement

if (window.location.pathname.includes('test')) {
  root.innerHTML = ''
  let test = new Test({})
  renderDOM('#root', test)
}
if (window.location.pathname.includes('messanger')) {
  root.innerHTML = ''
  renderDOM('#root', new Messanger({}))
}
if (window.location.pathname.includes('singin')) {
  root.innerHTML = ''
  renderDOM('#root', new SingInPage({}))
}
if (window.location.pathname.includes('singup')) {
  root.innerHTML = ''
  renderDOM('#root', new SingUnPage({}))
}
if (window.location.pathname.includes('profile')) {
  root.innerHTML = ''

  renderDOM('#root', new ProfilePage({}))
}

if (window.location.pathname == '/400') {
  root.innerHTML = ''
  root.appendChild(Error({ numberError: 404, type: '400' }))
}
if (window.location.pathname === '/500') {
  root.innerHTML = ''
  root.appendChild(Error({ numberError: 501, type: '500' }))
} /*

/*
class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}




class Block {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element = null;
  _meta = null;
  _setUpdate = false
  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
