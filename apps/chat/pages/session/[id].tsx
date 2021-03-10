import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import Amplify from 'aws-amplify'
import { fetchSession } from '@botui/api'
import { Chat } from '../../components'
import { Session } from '@botui/types'

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

interface ChatMainProps {
  session: Session
}

const ChatMain: FC<ChatMainProps> = (props) => {
  return (
    <Chat
      config={{ ...props.session, messages: [], percentOfProgress: 0 }}
      proposals={props.session.proposals}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  ChatMainProps,
  { id: string }
> = async (context) => {
  if (!context.params)
    return { redirect: { permanent: true, destination: '/invalid' } }
  const { id } = context.params

  const session = await fetchSession(id)
  if (!session || !session.active) {
    return { redirect: { permanent: true, destination: '/invalid' } }
  }

  return { props: { session } }
}

export default ChatMain
