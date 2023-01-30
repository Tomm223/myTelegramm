import CompileMaster from '@/core/CompileJSX'
import Component from '@/utils/Component'
import Profile from '@/entities/Profile'

interface ProfileType {
  profile: Component
}

export default class ProfilePage extends Component<ProfileType> {
  constructor(props: ProfileType) {
    props.profile = new Profile({})

    super(props)
  }

  protected render(): HTMLElement {
    return <div>{this.childrenHTML.elements.profile}</div>
  }
}

/**
 *  {LoadFileModal({ isOpen: isAvatarWindow, size: { height: '260px' }, error: null })}
         <div class={styles.link_back}>
            {LinkToBack({ href: '/' })}
         </div>
         <div class={styles.form}>
            {ProfileForm({ isEdit, isPassword })}
         </div>
 */
