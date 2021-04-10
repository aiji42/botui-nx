import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Amplify from 'aws-amplify'
import { Chat } from '../../components'
import { Session } from '@botui/types'
import Image from 'next/image'

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

interface PreviewProps {
  session: Session | null
}

const Preview: FC<PreviewProps> = ({ session }) => {
  return session ? (
    <Chat session={session} />
  ) : (
    <Image src="/notFound.svg" layout="responsive" width="" height="" />
  )
}

export const getServerSideProps: GetServerSideProps<PreviewProps> = async (
  context
) => {
  if (
    typeof context.query.jsonedSession !== 'string' ||
    !context.query.jsonedSession
  )
    return { props: { session: null } }

  try {
    const session = JSON.parse(context.query.jsonedSession)
    return { props: { session } }
  } catch (e) {
    console.error(e)
    return { props: { session: null } }
  }
}

export default Preview
