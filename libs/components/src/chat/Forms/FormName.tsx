import { useEffect, FC, KeyboardEvent, useRef, Fragment } from 'react'
import { withFormik, Field, ErrorMessage, useField, FormikProps } from 'formik'
import * as yup from 'yup'
import InputName from './Elements/InputName'
import InputNameKana from './Elements/InputNameKana'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import { css } from '@emotion/react'
import { useKana } from 'react-use-kana'
import { customHandleSubmit } from './modules'
import { FormNameValues, FormName as FormNameType } from '@botui/types'

const style = {
  row: css({
    display: 'flex',
    justifyContent: 'space-between'
  }),
  formBlockDetailHalf: css({
    marginBottom: 3,
    width: '49.5%'
  })
}

const Form: FC<FormikProps<FormNameValues>> = (props) => {
  const { handleSubmit, status } = props
  const {
    kana: familyNameKana,
    setKanaSource: setFamilyNameKanaSource
  } = useKana({ kanaType: status.kanaType })
  const {
    kana: firstNameKana,
    setKanaSource: setFirstNameKanaSource
  } = useKana({ kanaType: status.kanaType })
  const [, , familyNameKanaHelper] = useField('familyNameKana')
  const [, , firstNameKanaHelper] = useField('firstNameKana')

  const prevFamilyNameKana = useRef(familyNameKana)
  useEffect(() => {
    if (!status.kana || prevFamilyNameKana.current === familyNameKana) return
    familyNameKanaHelper.setValue(familyNameKana, true)
    prevFamilyNameKana.current = familyNameKana
  }, [familyNameKana, familyNameKanaHelper, status.kana])

  const prevFirstNameKana = useRef(firstNameKana)
  useEffect(() => {
    if (!status.kana || prevFirstNameKana.current === firstNameKana) return
    firstNameKanaHelper.setValue(firstNameKana, true)
    prevFirstNameKana.current = firstNameKana
  }, [firstNameKana, firstNameKanaHelper, status.kana])

  return (
    <form onSubmit={handleSubmit}>
      <div css={style.row}>
        <div css={style.formBlockDetailHalf}>
          <Field
            as={InputName}
            name="familyName"
            placeholder="??????"
            title="???"
            autoFocus
            onInput={(e: KeyboardEvent<HTMLInputElement>) =>
              setFamilyNameKanaSource(e.currentTarget.value)
            }
          />
          <ErrorMessage name="familyName" component={SpanErrorMessage} />
        </div>
        <div css={style.formBlockDetailHalf}>
          <Field
            as={InputName}
            name="firstName"
            placeholder="??????"
            title="???"
            onInput={(e: KeyboardEvent<HTMLInputElement>) =>
              setFirstNameKanaSource(e.currentTarget.value)
            }
          />
          <ErrorMessage name="firstName" component={SpanErrorMessage} />
        </div>
      </div>
      {status.kana && (
        <div css={style.row}>
          <div css={style.formBlockDetailHalf}>
            <Field
              as={InputNameKana}
              name="familyNameKana"
              kanaType={status.kanaType}
              placeholder={status.kanaType === 'katakana' ? '?????????' : '?????????'}
              title={status.kanaType === 'katakana' ? '??????' : '??????'}
            />
            <ErrorMessage name="familyNameKana" component={SpanErrorMessage} />
          </div>
          <div css={style.formBlockDetailHalf}>
            <Field
              as={InputNameKana}
              name="firstNameKana"
              kanaType={status.kanaType}
              placeholder={status.kanaType === 'katakana' ? '?????????' : '?????????'}
              title={status.kanaType === 'katakana' ? '??????' : '??????'}
            />
            <ErrorMessage name="firstNameKana" component={SpanErrorMessage} />
          </div>
        </div>
      )}
      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormName = withFormik<FormNameType, FormNameValues>({
  mapPropsToValues: ({ values }) => ({
    familyName: '',
    familyNameKana: '',
    firstName: '',
    firstNameKana: '',
    ...values
  }),
  validationSchema: ({ status }: FormNameType) => {
    const defaultValidate = {
      familyName: yup
        .string()
        .required('????????????????????????')
        .max(50, '??????????????????????????????'),
      firstName: yup
        .string()
        .required('????????????????????????')
        .max(50, '??????????????????????????????')
    }
    const regex = status.kanaType === 'katakana' ? /^[???-???]+$/ : /^[???-???]+$/
    const kanaValidate = {
      familyNameKana: yup
        .string()
        .required('????????????????????????')
        .max(50, '??????????????????????????????')
        .matches(
          regex,
          `??????${
            status.kanaType === 'katakana' ? '??????' : '??????'
          }???????????????????????????`
        ),
      firstNameKana: yup
        .string()
        .required('????????????????????????')
        .max(50, '??????????????????????????????')
        .matches(
          regex,
          `??????${
            status.kanaType === 'katakana' ? '??????' : '??????'
          }???????????????????????????`
        )
    }
    const validateShape = !status.kana
      ? defaultValidate
      : { ...defaultValidate, ...kanaValidate }

    return yup.object().shape(validateShape)
  },
  mapPropsToStatus: ({ status }) => status,
  handleSubmit: customHandleSubmit
})(Form)

export default FormName
