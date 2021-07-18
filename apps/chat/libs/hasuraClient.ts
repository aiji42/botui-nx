import { GraphQLClient } from 'graphql-request'
import { getSdk } from '@botui/graphql'

export const createHasuraClient = (token: string | null) => {
  const headers = token
    ? {
          authorization: `Bearer ${token}`,
        }
    : undefined

  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_END_POINT ?? '', { headers }
  )

  return getSdk(client)
}

export type HasuraClient = ReturnType<typeof createHasuraClient>