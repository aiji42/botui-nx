/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollaborator = /* GraphQL */ `
  subscription OnCreateCollaborator {
    onCreateCollaborator {
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
export const onUpdateCollaborator = /* GraphQL */ `
  subscription OnUpdateCollaborator {
    onUpdateCollaborator {
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
export const onDeleteCollaborator = /* GraphQL */ `
  subscription OnDeleteCollaborator {
    onDeleteCollaborator {
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
export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry($owner: String!) {
    onCreateEntry(owner: $owner) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry($owner: String!) {
    onUpdateEntry(owner: $owner) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry($owner: String!) {
    onDeleteEntry(owner: $owner) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($owner: String) {
    onCreateSession(owner: $owner) {
      id
      owner
      title
      active
      theme
      proposals
      images
      email
      launcher
      collaborators {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($owner: String) {
    onUpdateSession(owner: $owner) {
      id
      owner
      title
      active
      theme
      proposals
      images
      email
      launcher
      collaborators {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($owner: String) {
    onDeleteSession(owner: $owner) {
      id
      owner
      title
      active
      theme
      proposals
      images
      email
      launcher
      collaborators {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
