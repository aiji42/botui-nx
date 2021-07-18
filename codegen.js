// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  schema: [
    {
      'https://botui-dev.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
        }
      }
    }
  ],
  documents: ['./libs/graphql/src/**/*.graphql'],
  overwrite: true,
  generates: {
    './libs/graphql/src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ],
      config: {
        skipTypename: true,
        withHooks: true,
        withHOC: false,
        withComponent: false
      }
    },
    './libs/graphql/graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}
