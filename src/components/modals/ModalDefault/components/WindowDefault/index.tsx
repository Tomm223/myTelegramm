import CompileMaster from "@/core/CompileJSX";
import styles from './styles.module.scss'

interface WindowDefault {
   children: Node | string
   style: string
}

export default function WindowDefault({ children, style }: WindowDefault) {
   return (
      <div class={styles.block} style={style}>{children}</div>
   )
}
