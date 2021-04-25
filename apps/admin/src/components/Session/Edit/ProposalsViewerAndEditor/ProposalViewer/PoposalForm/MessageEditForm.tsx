import { FC, useRef, RefObject } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { Form } from 'react-final-form'
import { ProposalMessage } from '@botui/types'
import { NameKeySelector } from './NameKeySelector'
import { SaveButton } from './SaveButton'
import { required, TextInput } from 'react-admin'
import { DelayNumberSlider } from '../../../../parts'

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
      <DelayNumberSlider
        label="ローディング時間"
        source="data.content.delay"
        fullWidth
      />
      <Box position="relative" marginTop={3}>
        <TextInput
          source="data.content.props.children"
          label="メッセージ本文"
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
