import { FC } from 'react'
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  ListProps
} from 'react-admin'
import Empty from './Empty'

export const CollaboratorinvitationList: FC<ListProps> = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    empty={<Empty />}
  >
    <Datagrid rowClick="edit">
      <ReferenceField source="sessionId" reference="sessions">
        <TextField source="title" />
      </ReferenceField>
    </Datagrid>
  </List>
)
