import { FC, useCallback, useState } from 'react'
import {
  useRefresh,
  FunctionField,
  TabbedShowLayout,
  Tab,
  ShowProps,
  useShowContext,
  TextInput,
  required,
  email
} from 'react-admin'
import { Session } from '@botui/types'
import { Form } from 'react-final-form'
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

export const ShowInner: FC = () => {
  const classes = useStyles()
  const refresh = useRefresh()
  const remove = useCallback(
    (sessionId: string, email: string) => {
      if (!window.confirm('共同編集者から外しますか？')) return
      fetch('http://localhost:3333/api/collaborator/remove', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          email
        })
      }).then(() => refresh())
    },
    [refresh]
  )

  return (
    <TabbedShowLayout>
      <Tab label="共同編集者">
        <FunctionField<Session>
          source="collaborators"
          render={(record) => (
            <div className={classes.root}>
              {record?.collaborators?.map((email) => (
                <Chip
                  key={email}
                  label={email}
                  onDelete={() => remove(record.id, email)}
                  color="primary"
                />
              ))}
              {record?.collaboratorInvitations?.items
                ?.filter(({ status }) => status === 'inviting')
                .map(({ email, id, sessionId }) => (
                  <Chip
                    key={id}
                    label={`招待中: ${email}`}
                    onDelete={() => remove(sessionId, email)}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              <InviteDialogWithChipButton />
            </div>
          )}
        />
      </Tab>
    </TabbedShowLayout>
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
