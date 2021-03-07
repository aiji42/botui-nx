import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import Amplify from 'aws-amplify'
import { fetchSession } from '../api/session'
// import { Chat } from '../components'
import { Session } from '@botui/types'

if (process.env.AWS_EXPORTS) Amplify.configure(JSON.parse(process.env.AWS_EXPORTS))

interface ChatMainProps {
  session: Session
}

const ChatMain: FC<ChatMainProps> = (props) => {
  // return <Chat config={{ ...props.session, messages: [], percentOfProgress: 0 }} proposals={props.session.proposals} />
  return <div>{props.session.email}</div>
}

export const getServerSideProps: GetServerSideProps<
  ChatMainProps,
  { sessionId: string }
> = async (context) => {
  if (!context.params)
    return { redirect: { permanent: true, destination: '/invalid' } }
  const { sessionId } = context.params

  const session = await fetchSession(sessionId)
  if (!session || !session.active) {
    return { redirect: { permanent: true, destination: '/invalid' } }
  }

  return { props: { session } }
}

export default ChatMain
