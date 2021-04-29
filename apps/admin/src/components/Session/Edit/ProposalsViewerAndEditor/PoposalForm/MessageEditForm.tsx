import { FC, useRef, RefObject } from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { Form } from 'react-final-form'
import { ProposalMessage } from '@botui/types'
import { NameKeySelector } from './NameKeySelector'
import { SaveButton } from './SaveButton'
import { required, TextInput } from 'react-admin'
import { DelayNumberSlider } from '../../../parts'

const useStyle = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(1)
  }
}))

interface MessageEditFormProps {
  proposal?: ProposalMessage
  submitter: (value: ProposalMessage) => void
}

export const MessageEditForm: FC<MessageEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <FormInner />}
    />
  )
}

const FormInner = () => {
  const ref = useRef<HTMLInputElement>(null)
  const classes = useStyle()

  return (
    <>
      <Typography variant="h5">テキストメッセージ</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">一般的な文章を表示します。</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          入力時間を0秒以上に設定すると、メッセージが表示される前に、指定時間だけ文章入力中のアニメーションが表示されます。
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {`{{フォームの値名}}`}{' '}
          のように二重波括弧でフォームの値名を記入すると、ユーザの入力値に変換されます。
        </Typography>
      </Box>
      <DelayNumberSlider
        label="入力時間"
        source="data.content.delay"
        fullWidth
      />
      <Box position="relative" marginTop={3}>
        <TextInput
          source="data.content.props.children"
          label="メッセージ"
          validate={[required()]}
          fullWidth
          multiline
          rows={5}
          inputRef={ref}
        />
        <NameKeySelector
          onSelected={makeInsertKey(ref)}
          variant="extended"
          className={classes.fab}
        >
          ユーザ入力値の挿入
        </NameKeySelector>
      </Box>
      <SaveButton />
    </>
  )
}

const makeInsertKey = (ref: RefObject<HTMLInputElement>) => (key: string) => {
  if (document.activeElement !== ref.current) ref.current?.focus()
  document.execCommand('insertText', false, `{{${key}}}`)
}
