import Component from "./Component";
import CompileMaster from "@/core/CompileJSX";
import NextComp, { Buttonik } from ".";


interface NavType {
   count: number
   text: string
   events: any
   btn: any
}

export default class Nav extends Component<NavType> {


   constructor(props: NavType) {

      props.count = 0
      props.text = ''
      props.btn = new Buttonik({
         ref: 'button',
         events: {
            click: (e: MouseEvent) => {
               e.preventDefault()
               this.setProps({ count: this.props?.count + 1, btn: this.props.btn, events: this.props.events, text: this.props.text })
               console.log('btn');

            },
         },
         text: 'CLICK ME'
      })
      super(props)

   }

   protected componentDidMount(): void {
      console.log('did-mount', this.props.count);


   }

   protected init(): void {
      //this.props.count = 0
      //this.props.text = ''
      // this.
      this.props.events = {
         link: (e: MouseEvent) => {
            e.preventDefault()
            const tag = e.target as HTMLElement
            this.setProps({ count: this.props.count + 1, text: tag.getAttribute('href') || this.props.text, btn: this.props.btn, events: this.props.events })
            //this.props.count++
         }
      }
   }

   protected render(): HTMLElement {
      console.log('render');

      return (
         <nav>
            <ul>
               <li><a href="/">link_1</a></li>
               <li><a href="/1">link_2</a></li>
               <li><a href="/2">link_3</a></li>
               <li><a href="/3">link_4</a></li>
            </ul>

            {this.children_HTML.elements.btn}
         </nav>
      )
   }

   protected addEvents(): void {
      this._element?.querySelectorAll('a').forEach(tag => {
         tag.addEventListener('click', this.props.events.link)
      })
   }
}