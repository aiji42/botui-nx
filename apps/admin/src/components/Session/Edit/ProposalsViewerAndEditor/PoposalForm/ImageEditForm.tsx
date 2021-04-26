import { FC } from 'react'
import { Form } from 'react-final-form'
import { ProposalMessage, Session } from '@botui/types'
import { SaveButton } from './SaveButton'
import { useRecordContext } from 'react-admin'
import { ImageInput, DelayNumberSlider } from '../../../parts'

interface ImageEditFormProps {
  proposal?: ProposalMessage
  submitter: (value: ProposalMessage) => void
}

export const ImageEditForm: FC<ImageEditFormProps> = ({
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
  const { id: sessionId } = useRecordContext({} as Session)

  return (
    <>
      <DelayNumberSlider
        label="ローディング時間"
        source="data.content.delay"
        fullWidth
      />
      <ImageInput
        source="data.content.props.imgKey"
        label="画像"
        sessionId={sessionId}
        required
      />
      <SaveButton />
    </>
  )
}
