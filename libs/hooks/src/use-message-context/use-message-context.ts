import { useCallback, useContext } from 'react'
import { Content, Message } from '@botui/types'
import { MessageContext } from './MessageContextProvider'
import { useRouter } from 'next/router'

export const useMessageContext = <T extends Content = Content>(): { message: Message<T>, handleUpdate: () => void } => {
  const router = useRouter()
  const context = useContext(MessageContext)
  const handleUpdate = useCallback(() => {
    const url = { pathname: router.pathname, query: { currentId: context.id } }
    router.replace(url, url, { shallow: true })
  }, [router, context.id])

  return { message: context.message as Message<T>, handleUpdate }
}
