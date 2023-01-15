import CompileMaster from "@/core/CompileJSX";
import Header from "./components/Header";
import styles from './styles.module.scss'

import Img from 'static/icons/pics_message.png'
import FormSend from "./components/FormSend";
import MessageScreen from "./components/MessageScreen";

export default function Chat() {

   return (
      <div class={styles.container}>
         {Header({ img: Img, title: "Вадим Яшин" })}
         {MessageScreen({ messages: Array(15) })}
         <div class={styles.form}>
            {FormSend()}
         </div>
      </div>
   )
}

