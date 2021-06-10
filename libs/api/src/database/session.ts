import API, { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api'
import { Session } from '@botui/types'

const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      owner
      title
      active
      theme
      proposals
      images
      email
      launcher
      collaborators
      createdAt
      updatedAt
    }
  }
`

export const fetchSession = async (id: string): Promise<Session | null> => {
  const res = (await API.graphql({
    query: getSession,
    variables: { id },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })) as GraphQLResult<{
    getSession: Session<string, string, string, string>
  }>

  if (!res.data?.getSession) return null
  const {
    proposals: proposalsString,
    images: imageString,
    theme: themeString,
    launcher: launcherString,
    ...restSession
  } = res.data.getSession
  const proposals = JSON.parse(proposalsString)
  const images = JSON.parse(imageString)
  const theme = JSON.parse(themeString)
  const launcher = JSON.parse(launcherString)

  return {
    ...restSession,
    proposals,
    images,
    theme,
    launcher
  }
}
