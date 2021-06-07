import {useCallback} from 'react';
import {ShowProps, useShowContext} from 'react-admin';
import {Session} from '@botui/types';

export const useCollaboratorRemove = (props: ShowProps, callback?: () => void) => {
  const session = useShowContext<Session>(props)

  const remove = useCallback(
    async (email: string) => {
      if (!window.confirm(`${email} を共同編集者から外しますか？`)) return
      return fetch(`${process.env.NX_API_HOST}/collaborator/remove`, {
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

  return remove
}