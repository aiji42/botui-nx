/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`;
export const listEntrys = /* GraphQL */ `
  query ListEntrys(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        sessionId
        inputs
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const entryBySessionAndCreatedAt = /* GraphQL */ `
  query EntryBySessionAndCreatedAt(
    $sessionId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    entryBySessionAndCreatedAt(
      sessionId: $sessionId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        sessionId
        inputs
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        title
        active
        theme
        proposals
        images
        email
        launcher
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
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
      createdAt
      updatedAt
      collaborators {
        items {
          id
          userId
          token
          email
          sessionId
          valid
          invitationExpireOn
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`
export const listSessionsByOwner = /* GraphQL */ `
  query ListSessionsByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionsByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        active
        theme
        proposals
        images
        email
        launcher
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCollaborator = /* GraphQL */ `
  query GetCollaborator($id: ID!) {
    getCollaborator(id: $id) {
      id
      userId
      token
      email
      sessionId
      valid
      invitationExpireOn
      createdAt
      updatedAt
      session {
        id
        owner
        title
        active
        theme
        proposals
        images
        email
        launcher
        createdAt
        updatedAt
      }
    }
  }
`;
export const listCollaborators = /* GraphQL */ `
  query ListCollaborators(
    $filter: ModelCollaboratorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollaborators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        token
        email
        sessionId
        valid
        invitationExpireOn
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCoraboratorsBySession = /* GraphQL */ `
  query ListCoraboratorsBySession(
    $sessionId: ID
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoraboratorsBySession(
      sessionId: $sessionId
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        token
        email
        sessionId
        valid
        invitationExpireOn
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCoraboratorsByUser = /* GraphQL */ `
  query ListCoraboratorsByUser(
    $userId: String
    $sessionId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoraboratorsByUser(
      userId: $userId
      sessionId: $sessionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        token
        email
        sessionId
        valid
        invitationExpireOn
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCoraboratorsByTokenAndEmail = /* GraphQL */ `
  query ListCoraboratorsByTokenAndEmail(
    $token: String
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoraboratorsByTokenAndEmail(
      token: $token
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        token
        email
        sessionId
        valid
        invitationExpireOn
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
