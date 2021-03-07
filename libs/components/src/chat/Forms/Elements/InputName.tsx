import React, { FC, useCallback, FocusEvent } from 'react'
import InputWithIcon, { InputWithIconProps } from './InputWithIcon'
import { useField } from 'formik'

const removeSpace = (value: string): string => value.replace(/[\s]/g, '')

const InputName: FC<InputWithIconProps> = ({ innerRef, ...props }) => {
  const [field, , { setValue }] = useField(props)
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      field.onBlur(e)
      setValue(removeSpace(e.target.value))
    },
    [field, setValue]
  )

  return (
    <InputWithIcon
      type="text"
      {...props}
      innerRef={innerRef}
      onBlur={handleBlur}
    />
  )
}

export default InputName
