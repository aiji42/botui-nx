import { FC } from 'react'
import { ChatControllerServerProvider } from '@botui/chat-controller'
import { Session } from '@botui/types'
import { Header, Body, Footer } from './parts'
import { Tracker } from './parts/Tracker'

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
      <Tracker />
    </ChatControllerServerProvider>
  )
}
