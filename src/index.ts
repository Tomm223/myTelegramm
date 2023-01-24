
import SingIn from './pages/SingIn'


import '@/styles/global.scss'
import '@/styles/vars.scss'
import '@/styles/reset.css'
import Search from './components/form/Search';
import Messanger from './pages/Messenger';
import SingUp from './pages/SingUp';
import Profile from './pages/Profile';
import Error from './pages/Error';
import NextComp, { Buttonik } from './pages/Component';

import CompileMaster from '@/core/CompileJSX'
import Nav from './pages/Component/nav';
import { renderDOM } from './pages/Component/renderDOM';

const root = document.querySelector('#root') as HTMLElement;
// const root = document.querySelector('#root')


if (window.location.pathname.includes('comp')) {
  root.innerHTML = ''
  // renderDOM('#root', new Nav({btn}))
}


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
     *//*
constructor(tagName = "div", props = {}) {
const eventBus = new EventBus();
this._meta = {
tagName,
props
};

this.props = this._makePropsProxy(props);

this.eventBus = () => eventBus;

this._registerEvents(eventBus);
eventBus.emit(Block.EVENTS.INIT);
}

_registerEvents(eventBus) {
eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
}

_createResources() {
const { tagName } = this._meta;
this._element = this._createDocumentElement(tagName);
}

init() {
this._createResources();
console.log('init');
this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
}

_componentDidMount() {
this.componentDidMount();
}

// Может переопределять пользователь, необязательно трогать
componentDidMount(oldProps) { }

dispatchComponentDidMount() {
console.log('cdm');
this.eventBus().emit(Block.EVENTS.FLOW_CDM)
}

_componentDidUpdate(oldProps, newProps) {
console.log(oldProps, newProps);
const response = this.componentDidUpdate(oldProps, newProps);
if (response) {
this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
}
}

// Может переопределять пользователь, необязательно трогать
componentDidUpdate(oldProps, newProps) {
return true;
}

setProps = nextProps => {
if (!nextProps) {
return;
}
const oldProps = { ...this.props }
if (Object.values(nextProps).length) {
Object.assign(this.props, nextProps);
}

if (this._setUpdate) {
this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props)
this._setUpdate
}

};

get element() {
return this._element;
}

_render() {
const block = this.render();
// Этот небезопасный метод для упрощения логики
// Используйте шаблонизатор из npm или напишите свой безопасный
// Нужно не в строку компилировать (или делать это правильно),
// либо сразу в DOM-элементы возвращать из compile DOM-ноду
this._element.innerHTML = block;
}

// Может переопределять пользователь, необязательно трогать
render() {

}

getContent() {
return this.element;
}

_makePropsProxy(props) {
// Можно и так передать this
// Такой способ больше не применяется с приходом ES6+
const self = this;

return new Proxy(props, {
get(target, prop) {
const value = target[prop];
return typeof value === 'function' ? value.bind(target) : value;
},
set(target, prop, value) {

if (target[prop] !== value) {
target[prop] = value;
self._setUpdate = true
}

return true;
},
deleteProperty() {
throw new Error('Нет доступа');
}
});
}


_createDocumentElement(tagName) {
// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
return document.createElement(tagName);
}

show() {
this.getContent().style.display = 'block'
}

hide() {
this.getContent().style.display = 'none'

}
}




class Button extends Block {
constructor(props) {
// Создаём враппер дом-элемент button
super("button", props);
}

render() {
// В проекте должен быть ваш собственный шаблонизатор
return `<div>${this.props.text}</div>`;
}
}

function render(query, block) {
const root = document.querySelector(query);
root.appendChild(block.getContent());
block.dispatchComponentDidMount()
return root;
}

const button = new Button({
text: 'Click me',
});

// app — это class дива в корне DOM
//render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
button.setProps({
text: 'Click me, please',
});
}, 1000);



render('#root', button)
*/


