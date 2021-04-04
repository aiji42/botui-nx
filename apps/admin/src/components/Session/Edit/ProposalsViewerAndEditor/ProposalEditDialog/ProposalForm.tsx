import React, { FC, useEffect } from 'react'
import {
  Form,
  useForm,
  useFormState,
  FormRenderProps,
  FormProps
} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import ProposalMessageFormInner from './ProposalMessageFormInner'
import ProposalSkipperFormInner from './ProposalSkipperFormInner'
import { Proposal } from '@botui/types'
import ProposalCloserFormInner from './ProposalCloserFormInner'
import ProposalRelayerFormInner from './ProposalRelayerFormInner'

interface FormFunctions {
  trySubmit: boolean
  handleTrySubmit: (flag: boolean) => void
  handleSubmittable: (flag: boolean) => void
}

const ProposalForm: FC<
  FormProps<Proposal, Partial<Proposal>> & FormFunctions
> = (props) => {
  const { trySubmit, handleTrySubmit, handleSubmittable, ...rest } = props
  return (
    <Form<Proposal>
      mutators={{ ...arrayMutators }}
      subscription={{
        submitting: true,
        pristine: true,
        valid: true,
        invalid: true
      }}
      destroyOnUnregister
      {...rest}
      render={(formProps) => (
        <FormWrapper
          {...formProps}
          trySubmit={trySubmit}
          handleTrySubmit={handleTrySubmit}
          handleSubmittable={handleSubmittable}
        />
      )}
    />
  )
}

export default ProposalForm

const FormWrapper: FC<
  FormRenderProps<Proposal, Partial<Proposal>> & FormFunctions
> = (props) => {
  const { handleTrySubmit, handleSubmittable, trySubmit } = props
  const { submit } = useForm()
  const { pristine, values } = useFormState<Proposal>()
  useEffect(() => {
    if (!trySubmit) return
    submit()
    handleTrySubmit(false)
  }, [handleTrySubmit, trySubmit, submit])
  useEffect(() => {
    handleSubmittable(!pristine)
  }, [handleSubmittable, pristine])

  if (values.type === 'message') return <ProposalMessageFormInner />
  else if (values.type === 'relayer') return <ProposalRelayerFormInner />
  else if (values.type === 'skipper') return <ProposalSkipperFormInner />
  else if (values.type === 'closer') return <ProposalCloserFormInner />
  return null
}
