import { FC, useCallback } from 'react'
import { Labeled } from 'react-admin'
import { Slider } from '@material-ui/core'
import { useField } from 'react-final-form'

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

interface Props {
  label?: string
  fullWidth?: boolean
  source: string
}

const DelayNumberSlider: FC<Props> = (props) => {
  const field = useField<number>(props.source)
  const handleChange = useCallback(
    (_e: never, val: number) => {
      field.input.onChange({ target: { value: val } })
    },
    [field.input]
  )

  return (
    <Labeled {...props}>
      <span>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => <>{val / 1000}s</>}
          step={100}
          marks={marks}
          min={0}
          max={3000}
          defaultValue={field.meta.initial}
          onChange={handleChange}
        />
      </span>
    </Labeled>
  )
}

export default DelayNumberSlider
