import CompileMaster from '@/core/CompileJSX'
import LinkToBack from '@/shared/links/LinkToBack'
import Component from '@/core/Component'
import Profile from '@/widgets/Profile'
import styles from './styles.module.scss'

interface ProfileType {
  profile?: Component
}

export default class ProfilePage extends Component<ProfileType> {
  constructor(props: ProfileType) {
    props.profile = new Profile({})

    super(props)
  }

  protected render(): HTMLElement {
    return (
      <div class={styles.container}>
<<<<<<< HEAD
        <div class={styles.link_back}>{new LinkToBack({ href: '/messanger' }).getContent()}</div>
=======
        <div class={styles.link_back}>{new LinkToBack({ href: '/messenger' }).getContent()}</div>
>>>>>>> sprint_3
        {this.childrenHTML.elements.profile}
      </div>
    )
  }
}
