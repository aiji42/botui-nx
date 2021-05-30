import { mutations, queries } from '@botui/api'
import { NextApiHandler } from 'next'
import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import Amplify from 'aws-amplify'
import { Collaborator } from '@botui/types'

if (process.env.NEXT_PUBLIC_AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS))

const challenge: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  if (!req.body.userId || !req.body.email || !req.body.token) {
    res.status(400).json({ message: 'Bad Request' })
    return
  }

  const result = (await API.graphql({
    query: queries.listCoraboratorsByTokenAndEmail,
    variables: {
      token: req.body.token,
      email: { eq: req.body.email }
    },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })) as GraphQLResult<{
    listCoraboratorsByTokenAndEmail: { items: Array<Collaborator> }
  }>
  if ('error' in result) {
    console.log(result)
    res.status(500).json({ message: `Error` })
    return
  }

  const id = result.data?.listCoraboratorsByTokenAndEmail?.items?.[0]?.id
  // TODO: 存在チェック
  // TODO: 有効期限のチェック
  if (id) {
    const updateResult = await API.graphql({
      query: mutations.updateCollaborator,
      variables: {
        input: { id, valid: true, userId: req.body.userId }
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    })
    if ('error' in updateResult) {
      console.log(updateResult)
      res.status(500).json({ message: `Error` })
      return
    }
  }

  res.status(200).json({ message: 'succeed' })
}

export default challenge
