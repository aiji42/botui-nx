import { FC, useCallback, useState } from 'react'
import { useInput, InputProps, TextFieldProps } from 'react-admin'
import { ChromePicker, ColorResult } from 'react-color'
import {
  TextField as TextInputMU,
  Box,
  Paper,
  ClickAwayListener
} from '@material-ui/core'
import { useForm } from 'react-final-form'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

// https://github.com/mikbry/material-ui-color/pull/142
// https://github.com/mikbry/material-ui-color/pull/142/file
const generateClassName = createGenerateClassName({
  seed: 'ColorPicker'
})

const ColorInput: FC<InputProps<TextFieldProps>> = (props) => {
  const {
    input: { name, onChange, value, ...rest },
    meta: { touched, error },
    isRequired
  } = useInput(props)
  const { change } = useForm()
  const handleChange = useCallback(
    (color: ColorResult) => {
      change(name, color.hex)
    },
    [change, name]
  )
  const [open, setOpen] = useState(false)
  const handleOepn = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Box display="flex" justifyContent="flex-start" position="relative">
        <Box
          component={Paper}
          marginRight={1}
          width={40}
          height={40}
          style={{ backgroundColor: value, cursor: 'pointer' }}
          onClick={handleOepn}
        />
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
        {open && (
          <Box position="absolute" zIndex={1}>
            <ClickAwayListener onClickAway={handleClose}>
              <ChromePicker color={value} onChangeComplete={handleChange} />
            </ClickAwayListener>
          </Box>
        )}
      </Box>
    </StylesProvider>
  )
}

export default ColorInput
