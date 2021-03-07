import { useContext } from 'react'
import { ChatConfig } from '@botui/types'
import { ChatConfigContext } from './ChatConfigContextProvider'

export const useChatConfigContext = (): ChatConfig =>
  useContext(ChatConfigContext)
