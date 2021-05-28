import { mutations } from '@botui/api'
import { NextApiHandler } from 'next'
import API from '@aws-amplify/api'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import Amplify from 'aws-amplify';

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

const invite: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  if (!req.body.sessionId || !req.body.email) {
    res.status(400).json({ message: 'Bad Request' })
    return
  }

  const result = await API.graphql({
    query: mutations.createCollaborator,
    variables: {
      token: uuidv4(),
      email: req.body.email,
      sessionId: req.body.sessionId,
      valid: false,
      invitationExpireOn: dayjs().add(7, 'day').toDate()
    }
  })

  if ('error' in result) {
    console.log(result)
    res.status(500).json({ message: `Error` })
  }

  res.status(200).json({ message: 'succeed' })
}

export default invite
