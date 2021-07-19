import { GraphQLClient } from 'graphql-request'
import { getSdk } from '@botui/graphql'

export const createHasuraClient = () => {
  const headers = {
    'x-hasura-admin-secret':
      process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET ?? ''
  }

  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT ?? '',
    { headers }
  )

  return getSdk(client)
}

export type HasuraClient = ReturnType<typeof createHasuraClient>