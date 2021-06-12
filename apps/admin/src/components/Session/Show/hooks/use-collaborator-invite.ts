import { useShowContext, ShowProps, useNotify } from 'react-admin'
import { Session } from '@botui/types'
import { useCallback } from 'react'

export const useCollaboratorInvite = (
  props: ShowProps,
  callback?: () => void
) => {
  const session = useShowContext<Session>(props)
  const notify = useNotify()

  const invite = useCallback(
    async ({ email }: { email: string }) => {
      return fetch(`${process.env.NX_API_ENDPOINT}/collaborator/invite`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: session.record?.id,
          email
        })
      }).then((res) => {
        res.json().then(({ message }) => notify(message))
        callback?.()
      })
    },
    [session.record?.id, callback, notify]
  )

  return invite
}
