import { FC } from 'react'
import Amplify from 'aws-amplify'
import { Chat } from '../../components'

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

const Preview: FC = () => {
  return <Chat preview />
}

export default Preview
