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
import { useCollaboratorInvite } from './hooks/use-collaborator-invite'

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
      fetch(`${process.env.NX_API_HOST}/collaborator/remove`, {
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
  const refresh = useRefresh()
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const invite = useCollaboratorInvite(props, () => {
    refresh()
    handleClose()
  })

  return (
    <>
      <Chip label="追加する" clickable onClick={handleClickOpen} />
      <Dialog onClose={handleClose} open={open}>
        <Form
          onSubmit={invite}
          render={({ invalid, submitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {console.log(submitting, invalid)}
              <DialogTitle>共同編集者を追加</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  追加したいユーザのメールアドレスを入力してください。
                  <br />
                  対象ユーザがチャチャットに未登録でも問題ありません。(メンバー登録用の案内がメールで送信されます)
                </DialogContentText>
                <TextInput
                  source="email"
                  type="email"
                  label="メールアドレス"
                  validate={[required(), email()]}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={invalid || submitting}
                  type="submit"
                  color="primary"
                >
                  追加する
                </Button>
              </DialogActions>
            </form>
          )}
        ></Form>
      </Dialog>
    </>
  )
}
