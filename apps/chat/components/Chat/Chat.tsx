import { FC } from 'react'
import { ChatControllerServerProvider } from '@botui/chat-controller'
import { Session } from '@botui/types'
import { Header, Body, Footer } from './parts'

interface ChatProps {
  session?: Session
  preview?: boolean
}

export const Chat: FC<ChatProps> = ({ session, preview }) => {
  return (
    <ChatControllerServerProvider session={session} preview={preview}>
      <Header />
      <Body />
      <Footer />
    </ChatControllerServerProvider>
  )
}
