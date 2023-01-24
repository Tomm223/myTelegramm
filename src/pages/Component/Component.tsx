import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import CompileMaster from '@/core/CompileJSX'
import { deepEqual } from './deepEqual';

type Handler = (e: MouseEvent) => void

/**
 * @param {Record<string, Handler>} events 
 * @param {string} ref
 */
class Component<P extends Record<string, any> = any> {
   static EVENTS = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_CDU: 'flow:component-did-update',
      FLOW_RENDER: 'flow:render'
   } as const;

   public _element: HTMLElement | null = null;
   public id: string | number = nanoid()
   public ref: string | null
   public children: Record<string, Component | Component[]>;
   public children_HTML: {
      lists: Record<string, HTMLElement[]>,
      elements: Record<string, HTMLElement>
   } = { elements: {}, lists: {} };
   protected _setUpdate: boolean = false
   protected props: P;
   protected eventBus: () => EventBus;


   /** JSDoc
    * @param {Object} props
    * @returns {void}
    */
   constructor(propsWithChildren: P) {

      const eventBus = new EventBus();

      const { props, children, ref } = this._getChildrenAndProps(propsWithChildren);

      this.children = this._makePropsProxy(children);
      this.props = this._makePropsProxy(props);
      this.ref = ref

      this.eventBus = () => eventBus;

      this._registerEvents(eventBus);

      eventBus.emit(Component.EVENTS.INIT);
   }

   private _getChildrenAndProps(childrenAndProps: P): { ref: string | null, props: P, children: Record<string, Component | Component[]> } {
      const props: Record<string, unknown> = {};
      const children: Record<string, Component | Component[]> = {};
      let ref: string | null = null
      Object.entries(childrenAndProps).forEach(([key, value]) => {
         if (key === 'ref') {
            ref = value
            return
         }
         if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Component)) {
            children[key as string] = value;
         } else if (value instanceof Component) {
            children[key as string] = value
         } else {
            props[key] = value;
         }
      });

      return { props: props as P, children, ref };
   }
   private _childrenToHTML(children: Record<string, Component | Component[]>): {
      lists: Record<string, HTMLElement[]>,
      elements: Record<string, HTMLElement>
   } {

      const childrenHTML = {
         lists: {} as Record<string, HTMLElement[]>,
         elements: {} as Record<string, HTMLElement>
      }

      Object.keys(children).forEach(key => {
         let codidate = children[key]
         if (Array.isArray(codidate)) {
            childrenHTML.lists[key] = codidate.map(child => child.getContent() as HTMLElement)
         } else {
            childrenHTML.elements[key] = codidate.getContent() as HTMLElement
         }
      })
      return childrenHTML
   }

   protected addEvents() {
      const { events = {} } = this.props as P & { events: Record<string, () => void> };

      Object.keys(events).forEach(eventName => {
         this._element?.addEventListener(eventName, events[eventName]);
      });
   }
   protected removeEvents() {
      const { events = {} } = this.props as P & { events: Record<string, () => void> };

      Object.keys(events).forEach(eventName => {
         this._element?.removeEventListener(eventName, events[eventName]);
      });
   }

   private _registerEvents(eventBus: EventBus) {
      eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
      eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
   }

   private _init() {
      this.init();

      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
   }

   protected init() {

   }

   private _componentDidMount() {
      this.componentDidMount();

      Object.values(this.children).forEach(child => {
         if (Array.isArray(child)) {
            child.forEach(ch => ch.dispatchComponentDidMount());
         } else {
            child.dispatchComponentDidMount();
         }
      });
   }

   protected componentDidMount() {

   }

   public dispatchComponentDidMount() {
      this.eventBus().emit(Component.EVENTS.FLOW_CDM);
   }

   private _componentDidUpdate(oldProps: P, newProps: P) {
      if (this.shouldComponentUpdate(oldProps, newProps)) {
         this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
      }
   }

   protected shouldComponentUpdate(oldProps: P, newProps: P): boolean {
      return deepEqual(oldProps, newProps)
   }

   get element() {
      return this._element;
   }

   private _render() {

      //  трансорфмируем child-компоненты в html код для быстрой вставки
      const children_HTML = this._childrenToHTML(this.children)

      Object.assign(this.children_HTML, children_HTML)
      // build templateHTML by mount
      const template = this.render();


      if (!template.hasChildNodes() || !template.textContent) {
         throw Error("нет контента")
      }

      //чистка подписок
      this.removeEvents()

      if (this.props) template.setAttribute('props', JSON.stringify(this.props))
      if (this.ref) template.setAttribute('ref', this.ref)

      if (this._element && template) {

         this._element.replaceWith(template);

      }

      this._element = template;

      this.addEvents();
   }

   protected render(): HTMLElement {
      return <template>template</template>
   }

   getContent() {
      return this.element;
   }
   setProps = (nextProps: P) => {
      if (!nextProps) {
         return;
      }

      this._setUpdate = false

      const { children, props } = this._getChildrenAndProps(nextProps)

      let oldTarget = { ...this.props }

      if (Object.values(children).length) {
         Object.assign(this.children, children)
      }

      if (Object.values(props).length) {
         Object.assign(this.props, nextProps);
      }

      if (this._setUpdate) {
         this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, this.props); // childs которые в пропсах если их 
         //поменять то ререндера не будет
         this._setUpdate = false
      }

   };
   private _makePropsProxy(props: any) {
      const self = this
      return new Proxy(props, {
         get(target, prop: string) {
            const value = target[prop];
            return typeof value === 'function' ? value.bind(target) : value;
         },
         set(target, prop: string, value) {

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
}

export default Component

