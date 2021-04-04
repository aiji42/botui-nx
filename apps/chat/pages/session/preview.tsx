import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import Amplify from 'aws-amplify'
import { Chat } from '../../components'
import { Session } from '@botui/types'

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

interface PreviewProps {
  session: Session
}

const Preview: FC<PreviewProps> = (props) => {
  return <Chat session={props.session} />
}

export const getServerSideProps: GetServerSideProps<PreviewProps> = async (
  context
) => {
  if (
    typeof context.query.jsonedSession !== 'string' ||
    !context.query.jsonedSession
  )
    return { redirect: { permanent: true, destination: '/invalid' } }

  const session = JSON.parse(context.query.jsonedSession)

  return { props: { session } }
}

export default Preview
