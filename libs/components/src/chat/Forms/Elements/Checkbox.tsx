import React, {
  FC,
  ReactNode,
  InputHTMLAttributes,
  useMemo,
  useCallback,
  ChangeEvent
} from 'react'
import { css } from '@emotion/react'
import { useField, FieldInputProps } from 'formik'
import { colors } from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

const style = {
  base: css`
    border-radius: 3px;
    background-color: #ffffff;
    display: table;
    width: 100%;
    box-sizing: border-box;
    span {
      vertical-align: middle;
      display: inline-block;
      width: 75%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `,
  input: css`
    display: none;
  `,
  icon: css`
    vertical-align: middle;
    display: inline-block;
    margin: 13px;
    font-size: 1.3em;
  `,
  unCheckedIcon: css`
    color: gray;
  `,
  checkedIcon: css`
    color: ${colors.okColor};
  `,
  unCheckedStyle: css`
    border: solid 2px ${colors.baseBorderColor};
    background-color: #ffffff;
  `,
  checkedStyle: css`
    border: solid 2px ${colors.okColor};
    background-color: #fffdcf;
  `
}

type Props = {
  title: string | ReactNode
  value: string
} & FieldInputProps<string> &
  InputHTMLAttributes<HTMLInputElement>

const Checkbox: FC<Props> = ({ value, title, ...props }) => {
  const [, { value: formValue }, helper] = useField<Array<string>>(props)
  const checked = useMemo(() => formValue.includes(value), [formValue, value])
  const handleChange = useCallback(
    (e: ChangeEvent) => {
      props.onChange(e)
      helper.setTouched(true)
    },
    [props, helper]
  )

  return (
    <label
      css={[style.base, checked ? style.checkedStyle : style.unCheckedStyle]}
    >
      <div
        css={[style.icon, checked ? style.checkedIcon : style.unCheckedIcon]}
      >
        {checked ? (
          <FontAwesomeIcon icon={faCheckSquare} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
      </div>
      <span>{title}</span>
      <input
        {...props}
        value={value}
        type="checkbox"
        css={style.input}
        checked={checked}
        onChange={handleChange}
      />
    </label>
  )
}

export default Checkbox
