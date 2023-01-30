import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'
import Polygon1 from '@/static/icons/Polygon1.svg'

interface LinkToProfile {
  onClick?: () => void
  href?: string
}

export default function LinkToProfile({ onClick, href }: LinkToProfile) {
  return (
    <a class={styles.link_profile} href={href} onclick={onClick}>
      <p class={styles.link_profile__text}>Профиль</p>
      <img class={styles.link_profile__img} src={Polygon1} alt="" />
    </a>
  )
}
