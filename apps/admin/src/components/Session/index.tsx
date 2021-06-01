import { FC, useCallback, useState } from 'react'
import {
  Datagrid,
  List,
  TextField,
  BooleanField,
  useNotify,
  useRefresh,
  CreateProps,
  Edit,
  Create,
  FunctionField,
  EditButton,
  Toolbar,
  SaveButton,
  DeleteButton,
  ToolbarProps,
  Show,
  TabbedShowLayout,
  Tab,
  ShowProps,
  useShowContext,
  TextInput,
  required,
  email
} from 'react-admin'
import EditForm from './Edit'
import CreateForm from './Create'
import EmbeddedScriptDialog from './EmbeddedScriptDialog'
import { Session } from '@botui/types'
import PreviewDialog from './PreviewDialog'
import { useFormState, Form } from 'react-final-form'
import Empty from './Empty'
import {
  Chip,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

const EditToolbar: FC<Omit<ToolbarProps, 'width'>> = (props) => {
  const { values: session } = useFormState<Session>()
  return (
    <Toolbar {...props}>
      <SaveButton disabled={props.pristine} style={{ marginRight: 8 }} />
      <PreviewDialog session={session} />
      <EmbeddedScriptDialog session={session} />
    </Toolbar>
  )
}

export const SessionList: FC = (props) => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      exporter={false}
      empty={<Empty />}
    >
      <Datagrid>
        <TextField label="タイトル" source="title" sortable={false} />
        <BooleanField label="アクティブ" source="active" />
        <FunctionField<Session>
          render={(record) =>
            record ? <PreviewDialog session={record} /> : null
          }
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}

export const SessionCreate: FC<CreateProps> = (props) => {
  return (
    <Create {...props}>
      <CreateForm warnWhenUnsavedChanges />
    </Create>
  )
}

export const SessionEdit: FC = (props) => {
  const notify = useNotify()
  const refresh = useRefresh()

  return (
    <Edit
      {...props}
      onSuccess={() => {
        notify('ra.notification.updated', 'info', { smart_count: 1 }, true)
        refresh()
      }}
    >
      <EditForm warnWhenUnsavedChanges toolbar={<EditToolbar />} />
    </Edit>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))

export const SessionShow: FC<ShowProps> = (props) => {
  const classes = useStyles()
  const refresh = useRefresh()
  const eject = useCallback(
    (id) => {
      if (!window.confirm('共同編集者から外しますか？')) return
      fetch('http://localhost:3333/api/collaborator/eject', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      }).then(() => refresh())
    },
    [refresh]
  )

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="共同編集者">
          <FunctionField<Session>
            source="collaborators"
            render={(record) => (
              <div className={classes.root}>
                {record?.collaborators?.items?.map(
                  ({ email, valid, token, id }) => (
                    <Chip
                      key={token}
                      label={`${!valid && '招待中: '}${email}`}
                      onDelete={() => eject(id)}
                      variant={valid ? 'default' : 'outlined'}
                      color="primary"
                    />
                  )
                )}
                <InviteDialogWithChipButton />
              </div>
            )}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

const InviteDialogWithChipButton: FC<ShowProps> = (props) => {
  const [open, setOpen] = useState(false)
  const session = useShowContext<Session>(props)
  const refresh = useRefresh()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const invite = useCallback(
    ({ email }: { email: string }) => {
      fetch('http://localhost:3333/api/collaborator/invite', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionTitle: session.record?.title,
          sessionId: session.record?.id,
          email
        })
      }).then(() => {
        handleClose()
        refresh()
      })
    },
    [refresh, session.record?.id, session.record?.title]
  )

  return (
    <>
      <Chip label="招待する" clickable onClick={handleClickOpen} />
      <Dialog onClose={handleClose} open={open}>
        <Form
          onSubmit={invite}
          render={({ invalid, submitting, handleSubmit }) => (
            <>
              <DialogTitle>共同編集者を招待</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  入力したメールアドレスに招待リンク付きのメールが送信されます。招待リンクをクリックすると共同編集者に登録されます。
                </DialogContentText>
                <TextInput
                  source="email"
                  type="email"
                  label="通知用メールアドレス"
                  validate={[required(), email()]}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={invalid || submitting}
                  onClick={handleSubmit}
                  color="primary"
                >
                  招待する
                </Button>
              </DialogActions>
            </>
          )}
        ></Form>
      </Dialog>
    </>
  )
}
