import { useContext } from 'react'
import { ChatControllerContext } from './ChatControllerContext'

export const useChatController = () => useContext(ChatControllerContext)
