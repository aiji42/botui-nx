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
      createdAt
      updatedAt
      collaboratorInvitations {
        items {
          id
          code
          email
          status
          sessionId
          expireOn
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
      code
      email
      status
      sessionId
      expireOn
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
        code
        email
        status
        sessionId
        expireOn
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
        code
        email
        status
        sessionId
        expireOn
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCoraboratorsInvitationsByCodeAndEmail = /* GraphQL */ `
  query ListCoraboratorsInvitationsByCodeAndEmail(
    $code: String
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoraboratorsInvitationsByCodeAndEmail(
      code: $code
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        code
        email
        status
        sessionId
        expireOn
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCoraboratorsInvitationsByEmailAndStatus = /* GraphQL */ `
  query ListCoraboratorsInvitationsByEmailAndStatus(
    $email: String
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaboratorInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoraboratorsInvitationsByEmailAndStatus(
      email: $email
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        code
        email
        status
        sessionId
        expireOn
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
