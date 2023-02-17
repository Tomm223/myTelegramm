import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface Avatar {
  link: string
  width?: string
}

export default function Avatar({ link, width }: Avatar) {
  return (
    <div style={`width:${width}; height:${width};`} class={styles.block}>
      <img class={styles.img} src={link} alt="Avatar" />
    </div>
  )
}
