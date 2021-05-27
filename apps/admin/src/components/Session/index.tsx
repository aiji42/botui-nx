import { FC, useState } from 'react'
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
  ShowProps
} from 'react-admin'
import EditForm from './Edit'
import CreateForm from './Create'
import EmbeddedScriptDialog from './EmbeddedScriptDialog'
import { Session } from '@botui/types'
import PreviewDialog from './PreviewDialog'
import { useFormState } from 'react-final-form'
import Empty from './Empty'
import {
  Chip,
  makeStyles,
  Dialog,
  TextField as TextFieldInput,
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
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="共同編集者">
          <FunctionField<Session>
            source="collaborators"
            render={(record) => (
              <div className={classes.root}>
                {record?.collaborators?.items?.map(({ email, userId }) => (
                  <Chip
                    key={userId}
                    label={email}
                    onDelete={console.log}
                    color="primary"
                  />
                ))}
                <InviteDialogWithChipButton />
              </div>
            )}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

const InviteDialogWithChipButton: FC = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Chip label="招待する" clickable onClick={handleClickOpen} />
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>共同編集者を招待</DialogTitle>
        <DialogContent>
          <DialogContentText>
            入力したメールアドレスに招待リンク付きのメールが送信されます。招待リンクをクリックすると共同編集者に登録されます。
          </DialogContentText>
          <TextFieldInput
            autoFocus
            margin="dense"
            id="name"
            label="メールアドレス"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            招待する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}