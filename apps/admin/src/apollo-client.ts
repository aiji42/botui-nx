import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://botui.hasura.app/v1/graphql',
  headers: {
    'x-hasura-role': 'owner',
    'x-hasura-admin-secret': process.env.NX_HASURA_ADMIN_KEY
  },
  cache: new InMemoryCache()
})

