import { useShowContext, ShowProps } from 'react-admin'
import { Session } from '@botui/types'
import { useCallback } from 'react'

export const useCollaboratorInvite = (
  props: ShowProps,
  callback?: () => void
) => {
  const session = useShowContext<Session>(props)

  const invite = useCallback(
    ({ email }: { email: string }) => {
      fetch(`${process.env.NX_API_HOST}/collaborator/invite`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: session.record?.id,
          email
        })
      }).then(() => {
        callback?.()
      })
    },
    [session.record?.id, callback]
  )

  return invite
}
