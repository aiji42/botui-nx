import { FC } from 'react'
import { SimpleFormProps, FormTab, TabbedForm } from 'react-admin'
import SessionFormInner from './SessionFormInner'
import ChatLauncherFormInner from './ChatLauncherFormInner'
import ProposalsViewerAndEditor from './ProposalsViewerAndEditor'

type Props = Omit<SimpleFormProps, 'children'>

const Edit: FC<Props> = (props) => {
  return (
    <TabbedForm {...props}>
      <FormTab label="概要">
        <SessionFormInner />
      </FormTab>
      <FormTab label="タイムライン">
        <ProposalsViewerAndEditor />
      </FormTab>
      <FormTab label="ランチャー">
        <ChatLauncherFormInner />
      </FormTab>
    </TabbedForm>
  )
}

export default Edit
