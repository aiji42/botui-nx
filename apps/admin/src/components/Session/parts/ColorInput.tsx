import { FC, useCallback } from 'react'
import { useInput, InputProps, TextFieldProps } from 'react-admin'
import { Color, ColorPicker } from 'material-ui-color'
import { TextField as TextInputMU, Box } from '@material-ui/core'
import { useForm } from 'react-final-form'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

// https://github.com/mikbry/material-ui-color/pull/142
// https://github.com/mikbry/material-ui-color/pull/142/file
const generateClassName = createGenerateClassName({
  seed: 'ColorPicker',
})

const ColorInput: FC<InputProps<TextFieldProps>> = (props) => {
  const {
    input: { name, onChange, value, ...rest },
    meta: { touched, error },
    isRequired
  } = useInput(props)
  const { change } = useForm()
  const handleChange = useCallback(
    (color: Color) => {
      change(name, `#${color.hex}`)
    },
    [change, name]
  )

  return (
    <Box display="flex" justifyContent="flex-start">
      <Box marginRight={1}>
        <StylesProvider generateClassName={generateClassName}>
          <ColorPicker
            value={value}
            hideTextfield
            disableAlpha
            onChange={handleChange}
          />
        </StylesProvider>
      </Box>
      <TextInputMU
        name={name}
        label={props.label}
        onChange={onChange}
        error={!!(touched && error)}
        helperText={touched && error ? error : ' '}
        required={isRequired}
        value={value}
        {...rest}
      />
    </Box>
  )
}

export default ColorInput
