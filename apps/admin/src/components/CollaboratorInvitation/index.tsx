import { FC, useCallback, useState } from 'react'
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  ListProps,
  TopToolbar,
  ListActionsProps,
  sanitizeListRestProps,
  useRefresh,
  TextInput,
  required,
  Button as RaButton
} from 'react-admin'
import Empty from './Empty'
import { Form } from 'react-final-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import PersonAdd from '@material-ui/icons/PersonAdd'
import { Auth } from 'aws-amplify'

const ListActions: FC<ListActionsProps> = (props) => {
  return (
    <TopToolbar {...sanitizeListRestProps(props)}>
      <CollaboratorChallengeDialogWithButton />
    </TopToolbar>
  )
}

export const CollaboratorinvitationList: FC<ListProps> = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    actions={<ListActions />}
    empty={<Empty />}
  >
    <Datagrid rowClick="edit">
      <ReferenceField source="sessionId" reference="sessions">
        <TextField source="title" />
      </ReferenceField>
    </Datagrid>
  </List>
)

export const CollaboratorChallengeDialogWithButton: FC = () => {
  const [open, setOpen] = useState(false)
  const refresh = useRefresh()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const challenge = useCallback(
    ({ code }: { code: string }) => {
      Auth.currentUserInfo().then((user) => {
        fetch('http://localhost:3333/api/collaborator/challenge', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.attributes.email,
            code,
            userId: user.username
          })
        }).then(() => {
          handleClose()
          refresh()
        })
      })
    },
    [refresh]
  )

  return (
    <>
      <RaButton
        onClick={handleClickOpen}
        startIcon={<PersonAdd />}
        label="招待コードを入力"
      />
      <Dialog onClose={handleClose} open={open}>
        <Form
          onSubmit={challenge}
          render={({ invalid, submitting, handleSubmit }) => (
            <>
              <DialogTitle>招待コードを入力</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  招待コードを受け取っている場合には、コードを入力することで共同編集が可能です。
                </DialogContentText>
                <TextInput
                  source="code"
                  label="招待コード"
                  validate={[required()]}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={invalid || submitting}
                  onClick={handleSubmit}
                  color="primary"
                >
                  確定
                </Button>
              </DialogActions>
            </>
          )}
        ></Form>
      </Dialog>
    </>
  )
}
