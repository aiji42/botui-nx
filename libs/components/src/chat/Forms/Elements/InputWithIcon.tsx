/** @jsxImportSource @emotion/react */
import React, {
  FC,
  useEffect,
  useRef,
  MutableRefObject,
  InputHTMLAttributes,
  ReactNode
} from 'react'
import { useField, FieldMetaProps, FieldInputProps } from 'formik'
import { css, SerializedStyles } from '@emotion/react'
import { colors } from '../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const style = {
  base: css`
    padding: 8px 25px 8px 8px;
    border-radius: 3px;
    background-color: #ffffff;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    font-size: 1.05em;
    box-sizing: border-box;
    &:focus {
      border-left-width 5px;
      transition: all 300ms 0s ease;
    }
  `,
  title: css`
    font-size: 0.9em;
    line-height: 1;
    padding-top: 6px;
    padding-bottom: 4px;
  `,
  isOk: css`
    border: solid 2px ${colors.okColor};
  `,
  noTouched: css`
    border: solid 2px ${colors.baseBorderColor};
  `,
  withError: css`
    border: solid 2px ${colors.errorColor};
  `,
  okIcon: css`
    float: right;
    position: relative;
    right: 5px;
    top: -31px;
    color: ${colors.okColor};
    height: 0px;
  `
}

const styles = ({
  error,
  touched,
  initialValue
}: FieldMetaProps<string | number>): SerializedStyles | SerializedStyles[] => {
  if (!error) return [style.base, style.isOk]
  if (!touched && error && `${initialValue ?? ''}`.length === 0)
    return [style.base, style.noTouched]
  if (error) return [style.base, style.withError]
  return style.base
}

export type InputWithIconProps = {
  title: string | ReactNode
  autoFocus?: boolean
  innerRef?: MutableRefObject<HTMLInputElement>
} & FieldInputProps<string | number> &
  InputHTMLAttributes<HTMLInputElement>

const InputWithIcon: FC<InputWithIconProps> = ({
  innerRef,
  autoFocus,
  title,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null)
  const [, meta] = useField(props)
  const { error } = meta

  useEffect(() => {
    if (!autoFocus) return
    if (innerRef) innerRef.current.focus()
    else ref.current?.focus()
  }, [autoFocus, innerRef])

  return (
    <>
      <div css={style.title}>{title}</div>
      <input {...props} ref={innerRef || ref} css={styles(meta)} />
      {!error && (
        <div css={style.okIcon}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      )}
    </>
  )
}

InputWithIcon.defaultProps = {
  autoFocus: false
}

export default InputWithIcon
