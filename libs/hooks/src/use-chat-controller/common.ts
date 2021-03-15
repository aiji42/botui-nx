import { CustomWindow } from './customWindow'
import { JobFormPush } from '@botui/types'
import { pushForm } from './pushForm'

declare const window: CustomWindow

type Values = Record<string, string>

const formPush = async (
  job: JobFormPush,
  values: Values
): Promise<void> => {
  const form = document.querySelector<HTMLFormElement>(job.formSelector)
  if (!form) return
  job.dataMapper.forEach((mapper) => {
    if (!mapper.custom) {
      form[mapper.to].value = String(values[mapper.from])
      return
    }
    // eslint-disable-next-line no-new-func
    form[mapper.to].value = new Function('values', mapper.customValueScript)(
      values
    )
  })
  if (!job.ajax) {
    form.submit()
    return
  }
  const res = await pushForm(form)
  // eslint-disable-next-line no-new-func
  new Function('response', job.onSubmit ?? '')(res)
}

const evalFunction = async (functional: string, values: Values) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const AsyncFunction = Object.getPrototypeOf(async function () {})
    .constructor
  const func = new AsyncFunction('values', functional)
  await func(values)
}

const getCustomChoice = () => window.botui?.customChoice ?? {}
const getCustomMessage = () => window.botui?.customMessage ?? {}

export const methods = {
  evalFunction,
  getCustomChoice,
  getCustomMessage,
  formPush
}