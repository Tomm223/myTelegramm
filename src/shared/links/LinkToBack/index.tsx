import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Arrow from '@/static/icons/arrow-circle.svg'

interface LinkToBack {
  onClick?: () => void
  href: string
}

export default function LinkToBack({ href, onClick }: LinkToBack) {
  return (
    <a class={styles.link} href={href} onclick={onClick}>
      <img class={styles.img} src={Arrow} alt="" />
    </a>
  )
}
