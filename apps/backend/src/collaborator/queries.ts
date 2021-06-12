export const getInvitationAndSession = /* GraphQL */ `
  query getInvitationAndSession($sessionId: ID!, $email: String!) {
    invitation: listCollaboratorInvitationsBySession(
      sessionId: $sessionId
      email: { eq: $email }
    ) {
      items {
        id
      }
    }
    session: getSession(id: $sessionId) {
      id
      title
      collaborators
    }
  }
`

export interface GetInvitationAndSession {
  invitation: {
    items: Array<{ id: string }>
  }
  session: {
    id: string
    title: string
    collaborators: null | string[]
  } | null
}

export const mutateInvitationAndSession = /* GraphQL */ `
  mutation mutateInvitationAndSession(
    $sessionId: ID!
    $newCollaborators: [String!]!
    $invitationId: ID!
  ) {
    updateSession(input: { id: $sessionId, collaborators: $newCollaborators }) {
      id
    }
    deleteCollaboratorInvitation(input: { id: $invitationId }) {
      id
    }
  }
`
