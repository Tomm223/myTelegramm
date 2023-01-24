import CompileMaster from "@/core/CompileJSX";
import Component from "./Component";
import { EventBus } from "./EventBus";
import Nav from "./nav";

interface ButtonikType {
   ref: string
   events: {
      click: (e: MouseEvent) => void
   }
   text: string
}
export class Buttonik extends Component {
   constructor(props: ButtonikType) {
      super(props)
   }
   componentDidMount(): void {
      console.log('did-mount Buttonik');

   }
   protected render(): HTMLElement {
      return (
         <button onclick={this.props.events.click}>{this.props.text}</button>
      )
   }
}

interface PropsMy {
   count: number,
   text: string,
   bool: boolean,
   btn: Component
}

/**
 * 1) render: Node | Node[] =>> _render = {this.elem.appendChild(block)}
 */
export default class NextComp extends Component {

   constructor(props: PropsMy) {
      super(props)
   }

   protected init(): void {
      console.log('init');
      this.setProps({ count: 0 })

      this.eventBus().on(Component.EVENTS.FLOW_CDM, () => {
         console.log('did-mount');
      })

   }

   protected render(): HTMLElement {
      // let btn
      // if (!Array.isArray(this.children.btn)) {
      //    btn = this.children.btn.getContent()
      // }
      return (
         <div class='component'>

            <span>{this.props.count}</span>
            {new Buttonik({
               ref: '',
               events: {
                  click: (e: MouseEvent) => {
                     console.log('goo');
                     this.props.count++
                  }
               },
               text: 'Hello'
            }).getContent()}
         </div>
      )
   }

}

