import React, { FC } from 'react'
import { buildAuthProvider } from 'react-admin-amplify'
import { Resource, Admin as ReactAdmin } from 'react-admin'
import japaneseMessages from '@bicstone/ra-language-japanese'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import {
  AssignmentOutlined as AssignmentIcon,
  ChatBubbleOutline as ChatBubbleIcon
} from '@material-ui/icons'
import {
  Login,
  SessionList,
  SessionCreate,
  SessionEdit,
  EntryList,
  CustomizedLayout
} from './components'
import { useDataProvider } from './hooks'
import Amplify from 'aws-amplify'
import vocabularies from './i18n/amplify/vocabularies'
import { customizedTheme } from './customizedTheme'

const filterHost = (url: string) => new URL(url).host === window.location.host
if (process.env.NX_AWS_EXPORTS) {
  const awsconfig = JSON.parse(process.env.NX_AWS_EXPORTS)
  awsconfig.oauth.redirectSignIn =
    awsconfig.oauth.redirectSignIn.split(',').filter(filterHost).shift() ?? ''
  awsconfig.oauth.redirectSignOut =
    awsconfig.oauth.redirectSignOut.split(',').filter(filterHost).shift() ?? ''
  Amplify.configure(awsconfig)
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
        options={{ label: 'セッション' }}
        list={SessionList}
        edit={SessionEdit}
        create={SessionCreate}
        icon={ChatBubbleIcon}
      />
      <Resource
        name="entrys"
        options={{ label: 'エントリー' }}
        list={EntryList}
        icon={AssignmentIcon}
      />
    </ReactAdmin>
  )
}

export default Admin
