import ButtonConstructor from '@/shared/buttons/ButtonConstructor'
import ButtonsProfileNavigate from '@/shared/buttons/ButtonProfileNavigate'
import InputProfile from '@/shared/inputs/InputProfile'
import CompileMaster from '@/core/CompileJSX'
import { navBtnListType } from './UI/ButtonsForm'
import styles from './styles.module.scss'
import AvatarForm from './UI/AvatarForm'
import LoadFileModal from '../modals/LoadFileModal'
import Component from '@/utils/Component'
import { ProfileEventBus } from '../Profile/model'
import { inputsChange } from './constants'

interface ProfileFormType {
  isEdit?: boolean
  isPassword?: boolean
  inputs?: Input[]
  navBtn?: navBtnListType[]
  events?: Record<string, (e: SubmitEvent, inputs: Input[]) => void>
  btns?: Component[]
}

interface Input {
  label: string
  text: string
  name: string
  type: string
}

export default class ProfileForm extends Component<ProfileFormType> {
  constructor(props: ProfileFormType) {
    // props.events = {
    //   submit: (e: SubmitEvent) => {
    //     e.preventDefault()
    //     console.log(e.target,e.currentTarget);

    //     ProfileEventBus.emit('form:submit')
    //   },
    // }
    props.inputs = inputsChange.profile

    props.navBtn = [
      {
        name: 'Изменить данные',
        onClick: () => {
          ProfileEventBus.emit('option:profile-edit')
        },
        view: 'primary',
      },
      {
        name: 'Изменить пароль',
        onClick: () => {
          ProfileEventBus.emit('option:profile-edit')
        },
        view: 'primary',
      },
      {
        name: 'Выйти',
        onClick: () => {
          alert('куда выходить?')
        },
        view: 'red',
      },
    ]
    props.btns = [
      new ButtonConstructor({
        name: 'Сохранить',
        view: 'primary',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            ProfileEventBus.emit('form:submit')
          },
        },
      }),

      new ButtonConstructor({
        name: 'Не сохранять',
        view: 'transparent',
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            ProfileEventBus.emit('form:dont-save')
          },
        },
      }),
    ]

    super(props)
  }

  protected init(): void {
    ProfileEventBus.on('form:submit', () => {
      let form = this._element as HTMLFormElement
      let result: Record<string, string | number> = {}

      this?.props?.inputs?.forEach((item) => {
        result[item.name] = form[item.name].value
      })
      console.log(result)
    })
    ProfileEventBus.on('option:profile-edit', () => {
      this.setProps({ inputs: inputsChange.profile, isEdit: true })
    })
    ProfileEventBus.on('option:profile-no-edit', () => {
      this.setProps({ inputs: inputsChange.profile, isEdit: false })
    })
    ProfileEventBus.on('option:password', () => {
      this.setProps({ inputs: inputsChange.password, isEdit: true })
    })
    ProfileEventBus.on('mode:edit', () => {
      this.setProps({ isEdit: true })
    })
    ProfileEventBus.on('mode:no-edit', () => {
      this.setProps({ inputs: inputsChange.password })
    })
    ProfileEventBus.on('form:dont-save', () => {
      this.setProps({ inputs: inputsChange.profile, isEdit: false })
    })
  }

  protected render(): HTMLElement {
    console.log('render')

    let inputs = [<div></div>]
    let navs = [<div></div>]
    if (this.props.inputs?.length) {
      inputs = this.props.inputs.map((item) => {
        return (
          <div class={styles.form__item}>
            {
              new InputProfile({
                isEdit: this.props.isEdit || false,
                name: item.name,
                label: item.label,
                text: item.text,
                type: item.type,
              })
            }
          </div>
        )
      })
    }
    if (this.props.navBtn?.length) {
      navs = this.props.navBtn.map((item) => {
        return (
          <div class={styles.form__item}>
            {
              new ButtonsProfileNavigate({
                text: item.name,
                events: {
                  click: item.onClick,
                },
                view: item.view,
              })
            }
          </div>
        )
      })
    }

    return (
      <form action="" class={styles.form} style="width:500px;">
        {LoadFileModal({
          isOpen: false,
          size: { height: '260px' },
          error: null,
        })}
        <div class={styles.form__avatar}>{AvatarForm({ onClick: () => {} })}</div>
        <div class={styles.form__inputs}>{...inputs}</div>
        <div className={styles.form__buttons}>
          <div class={this.props.isEdit ? '' : 'hidden'}>{...this.childrenHTML.lists.btns}</div>
          <div class={this.props.isEdit ? 'hidden' : ''}>{...navs}</div>
        </div>
      </form>
    )
  }
}

/*
{isEdit ?
               <div>
                  {ButtonConstructor({ name: 'Сохранить', view: 'primary', onClick: toSave })}
               </div>
               :
               {
                  ...navBtnList.map(item => {
                     return (
                        <div class={styles.form__item}>
                           {ButtonsProfileNavigate({
                              children: item.name,
                              onClick: item.onClick,
                              view: item.view
                           })}
                        </div>
                     )
                  })
               }
            }

*/
