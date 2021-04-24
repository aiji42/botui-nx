import { FC, useRef, RefObject } from 'react'
import { makeStyles, Slider, Typography, Box } from '@material-ui/core'
import { useField, Form } from 'react-final-form'
import { ProposalMessage } from '@botui/types'
import { NameKeySelector } from './NameKeySelector'
import { SaveButton } from './SaveButton'
import { required, TextInput } from 'react-admin'

const useStyle = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
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
  const delayField = useField<number>('data.content.delay')

  return (
    <>
      <Typography variant="subtitle2">ローディング時間</Typography>
      <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(val) => <>{val / 1000}s</>}
        step={100}
        marks={marks}
        min={0}
        max={3000}
        defaultValue={delayField.meta.initial}
        onChange={delayField.input.onChange}
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
          className={classes.fab}
        />
      </Box>
      <SaveButton />
    </>
  )
}

const marks = [
  {
    value: 0,
    label: '0s'
  },
  {
    value: 1000,
    label: '1s'
  },
  {
    value: 2000,
    label: '2s'
  },
  {
    value: 3000,
    label: '3s'
  }
]

const makeInsertKey = (ref: RefObject<HTMLInputElement>) => (key: string) => {
  if (document.activeElement !== ref.current) ref.current?.focus()
  document.execCommand('insertText', false, `{{${key}}}`)
}
