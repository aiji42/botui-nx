import { FC, useRef, useEffect } from 'react'
import { withFormik, Field, ErrorMessage, FormikProps, useField } from 'formik'
import * as yup from 'yup'
import InputNumber from './Elements/InputNumber'
import SelectWithIcon from './Elements/SelectWithIcon'
import InputWithIcon from './Elements/InputWithIcon'
import SpanErrorMessage from './Elements/SpanErrorMessage'
import ButtonSubmit from './Elements/ButtonSubmit'
import { usePostalJp } from 'use-postal-jp'
import { customHandleSubmit } from './modules'
import { FormAddressValues, FormAddress as FormAddressType } from '@botui/types'
import jpPrefecture from 'jp-prefecture'

const prefectures: Array<{
  id: number
  name: string
}> = jpPrefecture.getAll('pref', ['id', 'name'])

const Form: FC<FormikProps<FormAddressValues>> = (props) => {
  const { handleSubmit } = props

  const {
    address,
    sanitizedCode,
    error: postalError,
    pending,
    setPostalCode
  } = usePostalJp()
  const [, postalCodeMeta, postalCodeHelper] = useField('postalCode')
  const [, prefectureIdMeta, prefectureIdHelper] = useField('prefectureId')
  const [, , prefectureHelper] = useField('prefecture')
  const [, , cityHelper] = useField('city')

  const inputStreetEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { prefectureCode, address1, address2, address3, address4 } = address
    if (prefectureCode) {
      prefectureIdHelper.setValue(Number(prefectureCode))
      prefectureIdHelper.setTouched(true)
    }
    if (address1) {
      cityHelper.setValue(address1 + address2 + address3 + address4)
      cityHelper.setTouched(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    setPostalCode(postalCodeMeta.value)
  }, [setPostalCode, postalCodeMeta.value])

  useEffect(() => {
    if (sanitizedCode.length !== 7) return
    postalCodeHelper.setValue(sanitizedCode)
    !pending && !postalError && inputStreetEl.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanitizedCode, postalError, pending])

  useEffect(() => {
    if (prefectureIdMeta.value)
      prefectureHelper.setValue(
        jpPrefecture.prefFindBy('id', parseInt(prefectureIdMeta.value), 'name')
      )
    else prefectureHelper.setValue('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefectureIdMeta.value])

  return (
    <form onSubmit={handleSubmit}>
      <Field
        as={InputNumber}
        name="postalCode"
        placeholder="1500002"
        title="????????????"
        autoFocus
      />
      <ErrorMessage name="postalCode" component={SpanErrorMessage} />

      <Field as={SelectWithIcon} name="prefectureId" title="????????????">
        <option value=""></option>
        {prefectures.map((prefecture) => (
          <option key={prefecture.id} value={prefecture.id}>
            {prefecture.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="prefectureId" component={SpanErrorMessage} />
      <Field type="hidden" name="prefecture" />

      <Field
        as={InputWithIcon}
        type="text"
        placeholder="??????????????????"
        name="city"
        title="????????????"
      />
      <ErrorMessage name="city" component={SpanErrorMessage} />

      <Field
        as={InputWithIcon}
        type="text"
        placeholder="1-2-3"
        innerRef={inputStreetEl}
        name="street"
        title="??????"
      />
      <ErrorMessage name="street" component={SpanErrorMessage} />

      <Field
        as={InputWithIcon}
        type="text"
        placeholder="?????????ABC102??????"
        name="building"
        title="????????????????????????(??????)"
      />
      <ErrorMessage name="building" component={SpanErrorMessage} />

      <Field as={ButtonSubmit} name="submit" />
    </form>
  )
}

const FormAddress = withFormik<FormAddressType, FormAddressValues>({
  mapPropsToValues: ({ values }) => ({
    postalCode: '',
    prefecture: '',
    prefectureId: '',
    city: '',
    street: '',
    building: '',
    ...values
  }),
  validationSchema: yup.object().shape({
    postalCode: yup
      .string()
      .required('????????????????????????')
      .matches(/^\d{7}$/, '7????????????????????????????????????????????????'),
    prefecture: yup.string(),
    prefectureId: yup.number().min(1).max(47).required('????????????????????????'),
    city: yup
      .string()
      .required('????????????????????????')
      .max(200, '??????????????????????????????'),
    street: yup
      .string()
      .required('????????????????????????')
      .max(200, '??????????????????????????????'),
    building: yup.string().max(200, '??????????????????????????????')
  }),
  mapPropsToStatus: ({ status }) => status,
  handleSubmit: customHandleSubmit
})(Form)

export default FormAddress
