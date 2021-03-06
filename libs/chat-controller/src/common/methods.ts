import { CustomWindow } from './customWindow'
import { JobFormPush } from '@botui/types'
import { pushForm } from './pushForm'

declare const window: CustomWindow

type Values = Record<string, unknown>

export const initCustomMessageAndChoices = () => {
  window._botui = {
    ...(window._botui ?? {}),
    customChoice: {},
    customMessage: {}
  }
  window.botui = {
    ...(window.botui ?? {}),
    setCustomChoice: (key, data) => {
      window._botui = window._botui ?? {}
      window._botui.customChoice = { ...(window._botui.customChoice ?? {}), [key]: data }
    },
    setCustomMessage: (key, data) => {
      window._botui = window._botui ?? {}
      window._botui.customMessage = { ...(window._botui.customMessage ?? {}), [key]: data }
    }
  }
}

const isNotCustom = (
  arg: JobFormPush['dataMapper'][0]
): arg is { from: string; to: string; custom: false } => !arg.custom

const formPush = async (job: JobFormPush, values: Values): Promise<void> => {
  const form = document.querySelector<HTMLFormElement>(job.formSelector)
  if (!form) return
  job.dataMapper.forEach((mapper) => {
    if (isNotCustom(mapper)) {
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
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const func = new AsyncFunction('values', functional)
  await func(values)
}

const loadScript = async (urls: string | string[]) => {
  const base = document.getElementsByTagName('script')[0]
  ;(Array.isArray(urls) ? urls : [urls]).forEach((src) => {
    const scriptTag = document.createElement('script')
    scriptTag.async = true
    scriptTag.src = src
    base.parentNode?.insertBefore(scriptTag, base)
  })
}

const getCustomChoice = () => window._botui?.customChoice ?? {}
const getCustomMessage = () => window._botui?.customMessage ?? {}

export const methods = {
  evalFunction,
  getCustomChoice,
  getCustomMessage,
  formPush,
  loadScript
}
