import { useContext } from 'react'
import { ChatControllerServerContext } from './ChatControllerServerContext'

export const useChatControllerServer = () => useContext(ChatControllerServerContext)
