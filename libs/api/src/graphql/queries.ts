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
        collaborators
        googleAnalyticsId
        createdAt
        updatedAt
        collaboratorInvitations {
          nextToken
        }
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
      collaborators
      googleAnalyticsId
      createdAt
      updatedAt
      collaboratorInvitations {
        items {
          id
          email
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
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
        collaborators
        googleAnalyticsId
        createdAt
        updatedAt
        collaboratorInvitations {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCollaboratorInvitation = /* GraphQL */ `
  query GetCollaboratorInvitation($id: ID!) {
    getCollaboratorInvitation(id: $id) {
      id
      email
      sessionId
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
        collaborators
        googleAnalyticsId
        createdAt
        updatedAt
        collaboratorInvitations {
          nextToken
        }
      }
    }
  }
`;
export const listCollaboratorInvitations = /* GraphQL */ `
  query ListCollaboratorInvitations(
    $filter: ModelCollaboratorInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollaboratorInvitations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        sessionId
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
          collaborators
          googleAnalyticsId
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCollaboratorInvitationsBySession = /* GraphQL */ `
  query ListCollaboratorInvitationsBySession(
    $sessionId: ID
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollaboratorInvitationsBySession(
      sessionId: $sessionId
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        sessionId
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
          collaborators
          googleAnalyticsId
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCoraboratorInvitationsByEmail = /* GraphQL */ `
  query ListCoraboratorInvitationsByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoraboratorInvitationsByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        sessionId
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
          collaborators
          googleAnalyticsId
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
