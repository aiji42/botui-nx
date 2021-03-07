import { useContext } from 'react'
import { Content } from '@botui/types'
import { MessageContextType, MessageContext } from './MessageContextProvider'

export const useMessageContext = <
  T extends Content = Content
>(): MessageContextType<T> => {
  const context = useContext(MessageContext) as MessageContextType<T>
  return context
}
