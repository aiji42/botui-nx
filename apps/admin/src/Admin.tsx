import { FC } from 'react'
import { buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin as ReactAdmin } from 'react-admin'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined'
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutline'
import GroupWorkIcon from '@material-ui/icons/GroupWorkOutlined'
import {
  Login,
  SessionList,
  SessionCreate,
  SessionEdit,
  EntryList,
  CustomizedLayout,
  SessionShow
} from './components'
import { useDataProvider } from './hooks'
import Amplify, { Auth } from 'aws-amplify'
import vocabularies from './i18n/amplify/vocabularies'
import { customizedTheme } from './customizedTheme'
import { CollaboratorinvitationList } from './components/CollaboratorInvitation'

const filterHost = (url: string) => new URL(url).host === window.location.host
if (process.env.NX_AWS_EXPORTS) {
  const awsconfig = JSON.parse(process.env.NX_AWS_EXPORTS)
  awsconfig.oauth.redirectSignIn =
    awsconfig.oauth.redirectSignIn.split(',').filter(filterHost).shift() ?? ''
  awsconfig.oauth.redirectSignOut =
    awsconfig.oauth.redirectSignOut.split(',').filter(filterHost).shift() ?? ''
  Amplify.configure({
    ...awsconfig,
    graphql_headers: async () => {
      try {
        const token = (await Auth.currentSession()).getIdToken().getJwtToken()
        return { Authorization: token }
      } catch (e) {
        console.error(e)
        return {}
      }
    }
  })
}

Amplify.I18n.putVocabularies(vocabularies)
Amplify.I18n.setLanguage('ja')

const i18nProvider = polyglotI18nProvider(() => japaneseMessages)

const Admin: FC = () => {
  const dataProvider = useDataProvider()
  return (
    <ReactAdmin
      dataProvider={dataProvider}
      authProvider={buildAuthProvider()}
      i18nProvider={i18nProvider}
      loginPage={Login}
      layout={CustomizedLayout}
      theme={customizedTheme}
    >
      <Resource
        name="sessions"
        options={{ label: '????????????' }}
        list={SessionList}
        edit={SessionEdit}
        show={SessionShow}
        create={SessionCreate}
        icon={ChatBubbleIcon}
      />
      <Resource
        name="collaboratorInvitations"
        options={{ label: '????????????????????????' }}
        list={CollaboratorinvitationList}
        icon={GroupWorkIcon}
      />
      <Resource
        name="entrys"
        options={{ label: '???????????????' }}
        list={EntryList}
        icon={AssignmentIcon}
      />
    </ReactAdmin>
  )
}

export default Admin
