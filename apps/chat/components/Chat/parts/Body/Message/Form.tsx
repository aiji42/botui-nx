import React, { FC, useCallback, useEffect, useState } from 'react'
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
import { useChatController, useMessageContext, useProposal, CustomChoice } from '@botui/hooks'
import { ContentForm, Form as FormType, FormCustomRadioGroup as FormCustomRadioGroupProps, FormCustomCheckbox as FormCustomCheckboxProps, FormCustomSelect as FormCustomSelectProps } from '@botui/types'
import { css } from '@emotion/react'

const style = {
  form: css({
    minWidth: 250
  })
}

const Form: FC = () => {
  const message = useMessageContext<ContentForm>()
  const [customChoice, setCustomChoice] = useState<CustomChoice>({})
  const [, { handleUpdate }] = useProposal()
  const { store, values, getCustomChoice } = useChatController()
  const props = {...message.content.props, values}
  const handleComplete = useCallback(
    (arg: FormType) => {
      store.set(arg.values)
      handleUpdate()
    },
    [store, handleUpdate]
  )
  useEffect(() => {
    getCustomChoice().then((choice) => choice && setCustomChoice(choice))
  }, [getCustomChoice])

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
        <FormCustomRadioGroup {...props} inputs={{ ...props.inputs, ...customChoice }} onSubmitted={handleComplete} />
      )}
      {props.type === 'FormCustomSelect' && (
        <FormCustomSelect {...props} selects={{ ...props.selects, ...customChoice }} onSubmitted={handleComplete} />
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

const fillInputs = (props: FormCustomRadioGroupProps | FormCustomCheckboxProps, customChoice: CustomChoice) => {
  if (!customChoice[props.name]) return props
  return { ...props, inputs: customChoice[props.name].map(({ label: title, value }) => ({ title, value })) }
}

const fillSelects = (selects: FormCustomSelectProps['selects'], customChoice: CustomChoice) => {

}