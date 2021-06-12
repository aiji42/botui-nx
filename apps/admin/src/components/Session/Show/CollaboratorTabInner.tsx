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
  Avatar,
  makeStyles
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useCollaboratorInvite } from './hooks/use-collaborator-invite'
import { useCollaboratorRemove } from './hooks/use-collaborator-remove'
import { useOwnEmail } from '../../../hooks/use-own-email'
import { useOwnUserInfo } from 'apps/admin/src/hooks/use-own-user-info'

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
  const myInfo = useOwnUserInfo()

  return (
    <FunctionField<Session>
      source="collaborators"
      render={(record) => (
        <div className={classes.root}>
          <Chip
            icon={<AccountCircle />}
            label="オーナー"
            color="primary"
            variant={record.owner === myInfo?.username ? 'default' : 'outlined'}
          />
          {record?.collaborators?.map((email) => (
            <Chip
              key={email}
              avatar={<Avatar>{email[0]}</Avatar>}
              label={email}
              {...(myEmail && email !== myEmail
                ? { onDelete: () => remove(email) }
                : {})}
              color="primary"
              variant={email === myEmail ? 'default' : 'outlined'}
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
              <DialogTitle>コラボレーターを追加</DialogTitle>
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
