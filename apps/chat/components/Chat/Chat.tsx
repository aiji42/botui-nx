import React, { FC } from 'react'
import { ChatControllerProvider } from '@botui/hooks'
import { Session } from '@botui/types'
import { Header, Body, Footer } from './parts'

interface ChatProps {
  session: Session
}

export const Chat: FC<ChatProps> = ({ session }) => {
  return (
    <ChatControllerProvider session={session}>
      <Header />
      <Body />
      <Footer />
    </ChatControllerProvider>
  )
}
