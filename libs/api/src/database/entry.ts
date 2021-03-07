import API, { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Entry } from '@botui/types'

export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`

export type AddEntryInput = Pick<
  Entry<Record<string, unknown>>,
  'sessionId' | 'owner' | 'inputs'
>

export const addEntry = (input: AddEntryInput) =>
  API.graphql({
    query: createEntry,
    variables: {
      input: {
        owner: input.owner,
        sessionId: input.sessionId,
        inputs: JSON.stringify(input.inputs)
      }
    },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM
  })
