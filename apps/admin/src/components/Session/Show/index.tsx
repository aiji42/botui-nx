import { FC, useState } from 'react'
import {
  useRefresh,
  FunctionField,
  TabbedShowLayout,
  Tab,
  ShowProps,
  TextInput,
  required,
  email,
  useShowContext
} from 'react-admin'
import { Session } from '@botui/types'
import { Form } from 'react-final-form'
import {Chip, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography} from '@material-ui/core';
import { useCollaboratorInvite } from './hooks/use-collaborator-invite'
import { useCollaboratorRemove } from './hooks/use-collaborator-remove'
import {ChatControllerClient} from '@botui/chat-controller';
import {Auth} from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  img: {
    width: '100%',
    maxWidth: 600
  }
}))

export const ShowInner: FC<ShowProps> = (props) => {
  const classes = useStyles()
  const refresh = useRefresh()
  const remove = useCollaboratorRemove(props, refresh)

  return (
    <TabbedShowLayout>
      <Tab label="プレビュー">
        <FunctionField<Session>
          source="id"
          label=""
          render={(record) => (
            <Box width={320} height={560} mb={4}>
              <ChatControllerClient
                onClose={noop}
                onComplete={noop}
                preview
                session={record}
              >
                <iframe
                  src={`${process.env.NX_PREVIEW_HOST}/session/preview`}
                  title="プレビュー"
                  width="100%"
                  height="100%"
                />
              </ChatControllerClient>
            </Box>
          )}
        />
      </Tab>
      <Tab label="アナリティクス">
        <FunctionField<Session>
          source="id"
          label=""
          render={() => (
            <Box textAlign="center" m={1}>
              <Typography variant="h5" color="secondary">
                COMING SOON...
              </Typography>
              <img
                src="/assets/analytics.png"
                alt="eye catch"
                className={classes.img}
              />
            </Box>
          )}
        />
      </Tab>
      <Tab label="コラポレーター">
        <FunctionField<Session>
          source="collaborators"
          render={(record) => (
            <div className={classes.root}>
              {record?.collaborators?.map((email) => (
                <Chip
                  key={email}
                  label={email}
                  onDelete={() => remove(email)}
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

const noop = () => {
  // noop
}

const customValidation = (values: Session | undefined) => async (value: string) => {
  const myEmail = (await Auth.currentUserInfo()).attributes.email
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
                  validate={[required(), email(), customValidation(session?.record)]}
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
