import React, { FC, useCallback } from 'react'
import {
  FormAddress,
  FormBirthDay,
  FormConfirm,
  FormCreditCard,
  FormCustomCheckbox,
  FormCustomInput,
  FormCustomRadioGroup,
  FormCustomSelect,
  FormCustomTextarea,
  FormEmail,
  FormName,
  FormTel
} from '@botui/components'
import { useMessageContext, useProposal } from '@botui/hooks'
import { ContentForm, Form as FormType } from '@botui/types'
import { css } from '@emotion/react'

const style = {
  form: css({
    minWidth: 250
  })
}

const Form: FC = () => {
  const message = useMessageContext<ContentForm>()
  const [, { handleUpdate }] = useProposal()
  const props = message.content.props
  const handleComplete = useCallback(
    (props: FormType) => {
      // const newContent = { ...message.content, props }
      // if (!handleUpdate) return
      // if (message.completed)
      //   handleUpdate({ ...message, content: newContent, updated: true })
      // else handleUpdate({ ...message, content: newContent, completed: true })
      handleUpdate()
    },
    [message, handleUpdate]
  )

  // TODO: customChoiceの置換
  return (
    <div css={style.form}>
      {props.type === 'FormAddress' && (
        <FormAddress {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormBirthDay' && (
        <FormBirthDay {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormEmail' && (
        <FormEmail {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormName' && (
        <FormName {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormTel' && (
        <FormTel {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCreditCard' && (
        <FormCreditCard {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomRadioGroup' && (
        <FormCustomRadioGroup {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomSelect' && (
        <FormCustomSelect {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomInput' && (
        <FormCustomInput {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomTextarea' && (
        <FormCustomTextarea {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomCheckbox' && (
        <FormCustomCheckbox {...props} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormConfirm' && (
        <FormConfirm {...props} onSubmitted={handleComplete} />
      )}
    </div>
  )
}

export default Form
