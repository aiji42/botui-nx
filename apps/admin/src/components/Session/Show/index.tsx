import { VFC } from 'react'
import { TabbedShowLayout, Tab, ShowProps } from 'react-admin'
import { AnalyticsTabInner } from './AnalyticsTabInner'
import { PreviewTabInner } from './PreviewTabInner'
import { CollaboratorTabInner } from './CollaboratorTabInner'

export const ShowInner: VFC<ShowProps> = (props) => {
  return (
    <TabbedShowLayout>
      <Tab label="プレビュー">
        <PreviewTabInner />
      </Tab>
      <Tab label="アナリティクス">
        <AnalyticsTabInner />
      </Tab>
      <Tab label="コラボレーター">
        <CollaboratorTabInner {...props} />
      </Tab>
    </TabbedShowLayout>
  )
}
