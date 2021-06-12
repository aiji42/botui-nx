/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
          email
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
          email
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`
export const updateEntry = /* GraphQL */ `
  mutation UpdateEntry(
    $input: UpdateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    updateEntry(input: $input, condition: $condition) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`
export const deleteEntry = /* GraphQL */ `
  mutation DeleteEntry(
    $input: DeleteEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    deleteEntry(input: $input, condition: $condition) {
      id
      owner
      sessionId
      inputs
      createdAt
      updatedAt
    }
  }
`
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
          email
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`
export const createCollaboratorInvitation = /* GraphQL */ `
  mutation CreateCollaboratorInvitation(
    $input: CreateCollaboratorInvitationInput!
    $condition: ModelCollaboratorInvitationConditionInput
  ) {
    createCollaboratorInvitation(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        collaboratorInvitations {
          nextToken
        }
      }
    }
  }
`
export const updateCollaboratorInvitation = /* GraphQL */ `
  mutation UpdateCollaboratorInvitation(
    $input: UpdateCollaboratorInvitationInput!
    $condition: ModelCollaboratorInvitationConditionInput
  ) {
    updateCollaboratorInvitation(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        collaboratorInvitations {
          nextToken
        }
      }
    }
  }
`
export const deleteCollaboratorInvitation = /* GraphQL */ `
  mutation DeleteCollaboratorInvitation(
    $input: DeleteCollaboratorInvitationInput!
    $condition: ModelCollaboratorInvitationConditionInput
  ) {
    deleteCollaboratorInvitation(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        collaboratorInvitations {
          nextToken
        }
      }
    }
  }
`
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
