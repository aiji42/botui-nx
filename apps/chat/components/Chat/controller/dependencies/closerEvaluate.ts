import { ChatConfig, Closer } from '@botui/types'
import { evalFunction, webhook, formPush } from './relayerEvaluate'
import { addEntry } from '@botui/api'

type Values = Record<string, unknown>

const notify = async (
  values: Values,
  chatConfig: ChatConfig
): Promise<void> => {
  const { id, title, email } = chatConfig
  if (!email) return
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  await fetch('/api/notify', {
    method: 'POST',
    headers,
    body: JSON.stringify({ values, config: { id, title, email } })
  })
}

export const closerEvaluate = async (
  closer: Closer,
  values: Values,
  chatConfig: ChatConfig
): Promise<void> => {
  if (closer.job === 'store')
    await addEntry({
      sessionId: chatConfig.id,
      owner: chatConfig.owner,
      inputs: values
    })
  if (closer.job === 'script') await evalFunction(closer.script, values)
  if (closer.job === 'webhook') await webhook(closer.endpoint, values)
  if (closer.notify) notify(values, chatConfig)
  if (closer.job === 'formPush') await formPush(closer, values)
}
