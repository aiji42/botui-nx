/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      collaboratorInvitations {
        nextToken
      }
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
      createdAt
      updatedAt
      collaboratorInvitations {
        nextToken
      }
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
      createdAt
      updatedAt
      collaboratorInvitations {
        nextToken
      }
    }
  }
`;
export const onCreateCollaboratorInvitation = /* GraphQL */ `
  subscription OnCreateCollaboratorInvitation {
    onCreateCollaboratorInvitation {
      id
      code
      email
      sessionId
      expireOn
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCollaboratorInvitation = /* GraphQL */ `
  subscription OnUpdateCollaboratorInvitation {
    onUpdateCollaboratorInvitation {
      id
      code
      email
      sessionId
      expireOn
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCollaboratorInvitation = /* GraphQL */ `
  subscription OnDeleteCollaboratorInvitation {
    onDeleteCollaboratorInvitation {
      id
      code
      email
      sessionId
      expireOn
      createdAt
      updatedAt
    }
  }
`;
