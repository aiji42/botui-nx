import { FC } from 'react'
import { useForm, useFormState } from 'react-final-form'
import { Button, Box } from '@material-ui/core'

export const SaveButton: FC = () => {
  const { submit } = useForm()
  const { hasValidationErrors } = useFormState()
  return (
    <Box textAlign="right" marginTop={3}>
      <Button
        onClick={submit}
        disabled={hasValidationErrors}
        variant="contained"
        color="primary"
      >
        SAVE
      </Button>
    </Box>
  )
}
