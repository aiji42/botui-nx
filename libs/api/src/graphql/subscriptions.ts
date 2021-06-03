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
  subscription OnCreateSession($owner: String, $collaborators: String) {
    onCreateSession(owner: $owner, collaborators: $collaborators) {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($owner: String, $collaborators: String) {
    onUpdateSession(owner: $owner, collaborators: $collaborators) {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($owner: String, $collaborators: String) {
    onDeleteSession(owner: $owner, collaborators: $collaborators) {
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
export const onCreateCollaboratorInvitation = /* GraphQL */ `
  subscription OnCreateCollaboratorInvitation {
    onCreateCollaboratorInvitation {
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
export const onUpdateCollaboratorInvitation = /* GraphQL */ `
  subscription OnUpdateCollaboratorInvitation {
    onUpdateCollaboratorInvitation {
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
export const onDeleteCollaboratorInvitation = /* GraphQL */ `
  subscription OnDeleteCollaboratorInvitation {
    onDeleteCollaboratorInvitation {
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
