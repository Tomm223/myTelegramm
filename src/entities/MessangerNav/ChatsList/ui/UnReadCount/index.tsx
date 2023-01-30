import CompileMaster from '@/core/CompileJSX'
import styles from './styles.module.scss'

interface UnRead {
  number: number
}

export default function UnReadCount({ number }: UnRead) {
  return <div class={styles.circle}>{number}</div>
}
