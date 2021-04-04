import API, { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api'
import { Session } from '@botui/types'
import { getSession } from '../graphql/queries'

export const fetchSession = async (id: string): Promise<Session | null> => {
  const res = (await API.graphql({
    query: getSession,
    variables: { id },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })) as GraphQLResult<{
    session: Session<string, string, string, string>
  }>

  if (!res.data?.session) return null
  const {
    proposals: proposalsString,
    images: imageString,
    theme: themeString,
    launcher: launcherString,
    ...restSession
  } = res.data.session
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
