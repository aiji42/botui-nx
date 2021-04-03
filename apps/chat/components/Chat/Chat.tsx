import React, { FC } from 'react'
import { ChatControllerServerProvider } from '@botui/chat-controller'
import { Session } from '@botui/types'
import { Header, Body, Footer } from './parts'

interface ChatProps {
  session: Session
}

export const Chat: FC<ChatProps> = ({ session }) => {
  return (
    <ChatControllerServerProvider session={session}>
      <Header />
      <Body />
      <Footer />
    </ChatControllerServerProvider>
  )
}
