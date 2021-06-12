import { FC } from 'react'
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  ListProps,
  BooleanField
} from 'react-admin'
import Empty from './Empty'

export const CollaboratorinvitationList: FC<ListProps> = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false} empty={<Empty />}>
    <Datagrid>
      <ReferenceField
        source="sessionId"
        reference="sessions"
        label="タイトル"
        link="show"
      >
        <TextField source="title" sortable={false} />
      </ReferenceField>
      <ReferenceField
        source="sessionId"
        reference="sessions"
        label="アクティブ"
        link="show"
      >
        <BooleanField source="active" />
      </ReferenceField>
    </Datagrid>
  </List>
)
