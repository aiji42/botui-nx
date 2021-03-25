import React, { FC, createContext } from 'react'
import { Content, Message } from '@botui/types'

export interface MessageContextType<T = Content> {
  message: Message<T>
}

export const MessageContext = createContext<MessageContextType>({
  message: {} as Message
})

export const MessageContextProvider: FC<MessageContextType> = ({
  message,
  children
}) => {
  return (
    <MessageContext.Provider value={{ message }}>
      {children}
    </MessageContext.Provider>
  )
}
