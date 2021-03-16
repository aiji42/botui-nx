import React, { FC, createContext } from 'react'
import { Content, Message } from '@botui/types'

export interface MessageContextType<T = Content> {
  id: string | number
  message: Message<T>
}

export const MessageContext = createContext<MessageContextType>({
  id: 0,
  message: {} as Message
})

export const MessageContextProvider: FC<MessageContextType> = ({
  id,
  message,
  children
}) => {
  return (
    <MessageContext.Provider value={{ id, message }}>
      {children}
    </MessageContext.Provider>
  )
}
