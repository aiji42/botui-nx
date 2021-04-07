import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import Amplify from 'aws-amplify'
import { fetchSession } from '@botui/api'
import { Chat } from '../../components'
import { Session } from '@botui/types'
import Image from 'next/image'

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

interface ChatMainProps {
  session: Session | null
}

const ChatMain: FC<ChatMainProps> = ({ session }) => {
  return session ? (
    <Chat session={session} />
  ) : (
    <Image src="/notFound.svg" layout="responsive" width="" height="" />
  )
}

export const getServerSideProps: GetServerSideProps<
  ChatMainProps,
  { id: string }
> = async (context) => {
  if (!context.params)
    return { props: { session: null } }
  const { id } = context.params

  const session = await fetchSession(id)
  if (!session || !session.active)
    return { props: { session: null } }

  return { props: { session } }
}

export default ChatMain
