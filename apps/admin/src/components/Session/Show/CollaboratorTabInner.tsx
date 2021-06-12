import { VFC, FC, useState } from 'react'
import {
  useRefresh,
  FunctionField,
  ShowProps,
  TextInput,
  required,
  email,
  useShowContext
} from 'react-admin'
import { Session } from '@botui/types'
import { Form } from 'react-final-form'
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles
} from '@material-ui/core'
import { useCollaboratorInvite } from './hooks/use-collaborator-invite'
import { useCollaboratorRemove } from './hooks/use-collaborator-remove'
import { useOwnEmail } from '../../../hooks/use-own-email'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))

export const CollaboratorTabInner: VFC<ShowProps> = (props) => {
  const classes = useStyles()
  const refresh = useRefresh()
  const remove = useCollaboratorRemove(props, refresh)
  const myEmail = useOwnEmail()

  return (
    <FunctionField<Session>
      source="collaborators"
      render={(record) => (
        <div className={classes.root}>
          {record?.collaborators?.map((email) => (
            <Chip
              key={email}
              label={email}
              {...(myEmail && email !== myEmail
                ? { onDelete: () => remove(email) }
                : {})}
              color="primary"
            />
          ))}
          <InviteDialogWithChipButton />
        </div>
      )}
    />
  )
}

const customValidation = (
  values: Session | undefined,
  myEmail: string | null
) => async (value: string) => {
  if (myEmail === value) return '自分のメールアドレスは追加できません。'
  if (values.collaborators?.includes(value))
    return 'すでに追加されているメールアドレスです。'
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
  const session = useShowContext<Session>(props)
  const myEmail = useOwnEmail()

  return (
    <>
      <Chip label="追加する" clickable onClick={handleClickOpen} />
      <Dialog onClose={handleClose} open={open}>
        <Form
          onSubmit={invite}
          render={({ invalid, submitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>コラポレーターを追加</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  コラボレーションしたいユーザのメールアドレスを入力してください。
                  <br />
                  対象ユーザがチャチャットに未登録でも問題ありません。(登録用の案内がメールで送信されます)
                </DialogContentText>
                <TextInput
                  source="email"
                  type="email"
                  label="メールアドレス"
                  validate={[
                    required(),
                    email(),
                    customValidation(session?.record, myEmail)
                  ]}
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
