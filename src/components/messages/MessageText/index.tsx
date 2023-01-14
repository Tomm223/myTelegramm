import CompileMaster from "@/core/CompileJSX";
import DnOwnMessage from "./views/dnOwn";
import MyMessage from './views/my'

interface MessageText {
   text: string,
   date: string,
   isMy: boolean,
   isRead: boolean
}

export default function MessageText({ text, date, isMy, isRead }: MessageText) {


   if (isMy) {
      return (
         <div>
            {MyMessage({ date, isRead: isRead, text })}
         </div>
      )
   }
   else {
      return (
         <div>
            {DnOwnMessage({ date, text })}
         </div>
      )
   }
}
