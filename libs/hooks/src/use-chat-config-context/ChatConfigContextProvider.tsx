import React, { FC, createContext } from 'react'
import { ChatConfig } from '@botui/types'

const initialValue: ChatConfig = {
  id: '',
  title: '',
  owner: '',
  active: false,
  theme: {},
  images: {},
  messages: [],
  percentOfProgress: 0,
  launcher: { defaultOpen: false, size: 'auto' }
}

export const ChatConfigContext = createContext<ChatConfig>(initialValue)

export const ChatConfigContextProvider: FC<ChatConfig> = ({
  children,
  ...chatConfig
}) => {
  return (
    <ChatConfigContext.Provider value={{ ...initialValue, ...chatConfig }}>
      {children}
    </ChatConfigContext.Provider>
  )
}
