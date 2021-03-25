import { useContext } from 'react'
import { Content, Message } from '@botui/types'
import { MessageContext } from './MessageContextProvider'

export const useMessageContext = <
  T extends Content = Content
>(): Message<T> => {
  return useContext(MessageContext).message as Message<T>
}
