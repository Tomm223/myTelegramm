//namespace('a.b.c.d.e') // "{"a":{"b":{"c":{"d":{"e":{}}}}}}"

function namespace(string) {
  if (string.length === 1) {
    return { [string]: {} }
  }

  const arr = string.split('.')
  const key = arr.shift()
  string = arr.join('.')
  string
  return { [key]: namespace(string) }

}

console.log(namespace('a.b.c.d.e'));

/*
const textInput = document.getElementById('text');
const heading = document.getElementById('heading');

if (!textInput || !heading) { 
    throw new Error('Отсутствуют нужные dom-элементы');
}

// Объект, у которого определим акцессор
const proxyObject = {};

// Описываем акцессор, а именно сеттер
Object.defineProperty(proxyObject, 'text', {
    set(value: string) {
        // как только кто-то что-то перезапишет в proxyObject.text
        // сделаем полезную работу - перезапишем данные в ноду с id=heading
        heading.textContent = value;
    }
});

// При вводе значений в инпут будем менять значение в объекте
input.addEventListener('keyup', (event) => {
    // хотя с тем же успехом могли и тут написать
    // heading.textContent = value;
    proxyObject.text = event.target.value;
});


//подписка

class Service {
   // Подписка на события
 on(event, callback) {
   this.listeners[event].push(callback);
 }

   // Отписка от события
 off(event, callback) { 
   this.listeners[event] = this.listeners[event]
       .filter(listener => listener !== callback);
 }

   // Публикуем событие (ещё говорят — диспатчим, эмитим)
 emit(event, data) {
   this.listeners[event].forEach(function (listener) {
       listener(data);
   });
 }
}*/

const btn = document.querySelector('.button');

const result = [];
btn.addEventListener('click', function () {
  result.push('first event');
})
btn.addEventListener('click', () => {
  result.push('second event');
})

btn.click();

console.log(result)


class EventBus {
  constructor() {
    this.listeners = {}; // eventName: [callback,callback]
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []; // если нет то создаем
    }

    this.listeners[event].push(callback); // заносим новый обработчик
  }

  off(event, callback) {
    if (!this.listeners[event]) {         // если нет такого eventName то ошибка 
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter( // берем нужный event и фильтруем и убираем нужный обработчик
      listener => listener !== callback
    );
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`); // если нет такого eventName то ошибка
    }

    this.listeners[event].forEach(listener => { //  мы берем из обьекта listeners нужный event и выполняем обработчики
      listener(...args);
    });
  }
}

const data = {
  test: 1,

};
const proxyData = new Proxy(data, {
  get(target, prop) {
    const value = target[prop];
    console.log("get data: ", value);
    return typeof value === "function" ? value.bind(target) : value;
  },
  set(target, prop, value) {
    target[prop] = value;
    console.log(`${prop}: ${value}`);
    return true;
  },
});

proxyData.test; // 'get data: 1'
proxyData.newProp = 'string'; // 'newProp: string' 


const proxyData = new Proxy(data, {
  get(target, prop) {
    if (prop.indexOf('_') === 0) {
      throw new Error('Отказано в доступе');
    }

    const value = target[prop];
    return typeof value === "function" ? value.bind(target) : value;
  },
  deleteProperty() {
    throw new Error('Отказано в доступе');
  },
});

proxyData._test; // Error: Отказано в доступе
proxyData.newProp = 'string'; // Не дойдёт сюда 


/*
import { EventBus } from "../event-bus";

// Нельзя создавать экземпляр данного класса
class Block {
 static EVENTS = {
   INIT: "init",
   FLOW_CDM: "flow:component-did-mount",
   FLOW_RENDER: "flow:render"
 };

 _element = null;
 _meta = null;

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
}

_createResources() {
const { tagName } = this._meta;
this._element = this._createDocumentElement(tagName);
}

init() {
this._createResources();
this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
}

_componentDidMount() {
this.componentDidMount();
}

componentDidMount(oldProps) {}

dispatchComponentDidMount() {
this._eventBus().emit(Block.EVENTS.FLOW_CDM);
}

_componentDidUpdate(oldProps, newProps) {
...
}

componentDidUpdate(oldProps, newProps) {
return true;
}

setProps = nextProps => {
if (!nextProps) {
return;
}

Object.assign(this.props, nextProps);
};

get element() {
return this._element;
}

_render() {
const block = this.render();
// Это небезопасный метод для упрощения логики
// Используйте шаблонизатор из npm или напишите свой безопасный
// Нужно компилировать не в строку (или делать это правильно),
// либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
this._element.innerHTML = block;
}

// Переопределяется пользователем. Необходимо вернуть разметку
render() {}

getContent() {
return this.element;
}

_makePropsProxy(props) {
// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
const self = this;

// Здесь вам предстоит реализовать метод
return props;
}

_createDocumentElement(tagName) {
// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
return document.createElement(tagName);
}

show() {
this.getContentl().stye.display = "block";
}

hide() {
this.getContent().style.display = "none";
}
}

export default Block; 
*/

function render(query, block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}



/*
для практикума

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  protected props;
  public children;
  private eventBus: () => EventBus;
  private _element;

  
  constructor(propsWithChildren) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps) {
    const props = {};
    const children = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {props: props, children};
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps, newProps) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps, newProps) {
    if (oldProps !== newProps) {
         return true
    }
    return false
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = {...context};

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}

        target[prop as keyof P] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }
}
*/



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
    this.eventBus.emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) { }

  dispatchComponentDidMoun() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
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
    if (Object.value(oldProps).length) {
      Object.assign(this.props, nextProps);
    }

    if (this._setUpdate) {
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props)
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