import { FC } from 'react'
import { Form } from 'react-final-form'
import { ProposalMessage, Session } from '@botui/types'
import { SaveButton } from './SaveButton'
import { useRecordContext } from 'react-admin'
import { ImageInput, DelayNumberSlider } from '../../../parts'
import { Box, Typography } from '@material-ui/core'

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
      <Typography variant="h5">イメージ</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">画像を表示します。</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          入力時間を0秒以上に設定すると、メッセージが表示される前に、指定時間だけ文章入力中のアニメーションが表示されます。
        </Typography>
      </Box>
      <DelayNumberSlider
        label="入力時間"
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
