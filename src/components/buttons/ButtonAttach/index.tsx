import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'
import Attach from 'static/icons/attach.svg'

interface ButtonAttach {
   onClick: () => {}
}
// const src = new URL(Attach, import.meta.url)
const src = new URL(Attach)
export default function ButtonAttach() {


   return (
      <button class={styles.btn}>
         <img class={styles.img} src={src} alt="Attach:file,photo..." />
      </button>
   )
}

