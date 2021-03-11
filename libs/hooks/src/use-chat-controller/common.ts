import { CustomWindow } from './customWindow'

declare const window: CustomWindow

type Values = Record<string, string>

const methods = {
  evalFunction: async (functional: string, values: Values) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const AsyncFunction = Object.getPrototypeOf(async function () {})
      .constructor
    const func = new AsyncFunction('values', functional)
    await func(values)
  },
  getCustomChoice: (key: string) => window.botui?.customChoice?.[key]
}
