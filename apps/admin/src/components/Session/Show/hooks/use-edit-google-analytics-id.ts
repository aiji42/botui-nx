import { useCallback } from 'react'
import { useDataProvider, useNotify } from 'react-admin'
import { Session } from '@botui/types'

export const useEditGoogleAnalyticsId = (
  record: Session,
  callback: () => void
) => {
  const { update } = useDataProvider()
  const notify = useNotify()

  return useCallback(
    async ({ googleAnalyticsId }) => {
      console.log(googleAnalyticsId)
      try {
        await update<Session>('sessions', {
          id: record.id,
          data: {
            ...record,
            googleAnalyticsId:
              googleAnalyticsId ?? ''
          },
          previousData: record
        })
        callback()
        notify('トラッキングIDを設定しました。', 'info')
      } catch (e) {
        notify(`トラッキングIDの設定に失敗しました。${e.message}`, 'error')
      }
    },
    [update, record, callback, notify]
  )
}
