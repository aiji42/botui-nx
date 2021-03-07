import React, { FC, createContext } from 'react'
import { Content, Message } from '@botui/types'

export interface MessageContextType<T = Content> {
  handleUpdate?: (arg: Message) => void
  message: Message<T>
}

const noOp = () => {
  // do nothing.
}

export const MessageContext = createContext<MessageContextType>({
  handleUpdate: noOp,
  message: {} as Message
})

export const MessageContextProvider: FC<MessageContextType> = ({
  message,
  handleUpdate = noOp,
  children
}) => {
  return (
    <MessageContext.Provider value={{ message, handleUpdate }}>
      {children}
    </MessageContext.Provider>
  )
}
