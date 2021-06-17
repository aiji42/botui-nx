/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSessionInput = {
  id?: string | null,
  owner?: string | null,
  title: string,
  active: boolean,
  theme: string,
  proposals: string,
  images: string,
  email?: string | null,
  launcher: string,
  collaborators?: Array< string | null > | null,
  googleAnalyticsId?: string | null,
};

export type ModelSessionConditionInput = {
  title?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  theme?: ModelStringInput | null,
  proposals?: ModelStringInput | null,
  images?: ModelStringInput | null,
  email?: ModelStringInput | null,
  launcher?: ModelStringInput | null,
  googleAnalyticsId?: ModelStringInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Session = {
  __typename: "Session",
  id?: string,
  owner?: string | null,
  title?: string,
  active?: boolean,
  theme?: string,
  proposals?: string,
  images?: string,
  email?: string | null,
  launcher?: string,
  collaborators?: Array< string | null > | null,
  googleAnalyticsId?: string | null,
  createdAt?: string,
  updatedAt?: string,
  collaboratorInvitations?: ModelCollaboratorInvitationConnection,
};

export type ModelCollaboratorInvitationConnection = {
  __typename: "ModelCollaboratorInvitationConnection",
  items?:  Array<CollaboratorInvitation | null > | null,
  nextToken?: string | null,
};

export type CollaboratorInvitation = {
  __typename: "CollaboratorInvitation",
  id?: string,
  email?: string,
  sessionId?: string,
  createdAt?: string,
  updatedAt?: string,
  session?: Session,
};

export type DeleteSessionInput = {
  id?: string | null,
};

export type UpdateEntryInput = {
  id: string,
  owner?: string | null,
  sessionId?: string | null,
  inputs?: string | null,
  createdAt?: string | null,
};

export type ModelEntryConditionInput = {
  sessionId?: ModelIDInput | null,
  inputs?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEntryConditionInput | null > | null,
  or?: Array< ModelEntryConditionInput | null > | null,
  not?: ModelEntryConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Entry = {
  __typename: "Entry",
  id?: string,
  owner?: string,
  sessionId?: string,
  inputs?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type DeleteEntryInput = {
  id?: string | null,
};

export type UpdateSessionInput = {
  id: string,
  owner?: string | null,
  title?: string | null,
  active?: boolean | null,
  theme?: string | null,
  proposals?: string | null,
  images?: string | null,
  email?: string | null,
  launcher?: string | null,
  collaborators?: Array< string | null > | null,
  googleAnalyticsId?: string | null,
};

export type CreateCollaboratorInvitationInput = {
  id?: string | null,
  email: string,
  sessionId: string,
};

export type ModelCollaboratorInvitationConditionInput = {
  email?: ModelStringInput | null,
  sessionId?: ModelIDInput | null,
  and?: Array< ModelCollaboratorInvitationConditionInput | null > | null,
  or?: Array< ModelCollaboratorInvitationConditionInput | null > | null,
  not?: ModelCollaboratorInvitationConditionInput | null,
};

export type UpdateCollaboratorInvitationInput = {
  id: string,
  email?: string | null,
  sessionId?: string | null,
};

export type DeleteCollaboratorInvitationInput = {
  id?: string | null,
};

export type CreateEntryInput = {
  id?: string | null,
  owner: string,
  sessionId: string,
  inputs: string,
  createdAt?: string | null,
};

export type ModelEntryFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  sessionId?: ModelIDInput | null,
  inputs?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEntryFilterInput | null > | null,
  or?: Array< ModelEntryFilterInput | null > | null,
  not?: ModelEntryFilterInput | null,
};

export type ModelEntryConnection = {
  __typename: "ModelEntryConnection",
  items?:  Array<Entry | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  title?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  theme?: ModelStringInput | null,
  proposals?: ModelStringInput | null,
  images?: ModelStringInput | null,
  email?: ModelStringInput | null,
  launcher?: ModelStringInput | null,
  collaborators?: ModelStringInput | null,
  googleAnalyticsId?: ModelStringInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items?:  Array<Session | null > | null,
  nextToken?: string | null,
};

export type ModelCollaboratorInvitationFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  sessionId?: ModelIDInput | null,
  and?: Array< ModelCollaboratorInvitationFilterInput | null > | null,
  or?: Array< ModelCollaboratorInvitationFilterInput | null > | null,
  not?: ModelCollaboratorInvitationFilterInput | null,
};

export type CreateSessionMutationVariables = {
  input?: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input?: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateEntryMutationVariables = {
  input?: UpdateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type UpdateEntryMutation = {
  updateEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEntryMutationVariables = {
  input?: DeleteEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type DeleteEntryMutation = {
  deleteEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input?: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateCollaboratorInvitationMutationVariables = {
  input?: CreateCollaboratorInvitationInput,
  condition?: ModelCollaboratorInvitationConditionInput | null,
};

export type CreateCollaboratorInvitationMutation = {
  createCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateCollaboratorInvitationMutationVariables = {
  input?: UpdateCollaboratorInvitationInput,
  condition?: ModelCollaboratorInvitationConditionInput | null,
};

export type UpdateCollaboratorInvitationMutation = {
  updateCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteCollaboratorInvitationMutationVariables = {
  input?: DeleteCollaboratorInvitationInput,
  condition?: ModelCollaboratorInvitationConditionInput | null,
};

export type DeleteCollaboratorInvitationMutation = {
  deleteCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateEntryMutationVariables = {
  input?: CreateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type CreateEntryMutation = {
  createEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetEntryQueryVariables = {
  id?: string,
};

export type GetEntryQuery = {
  getEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEntrysQueryVariables = {
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntrysQuery = {
  listEntrys?:  {
    __typename: "ModelEntryConnection",
    items?:  Array< {
      __typename: "Entry",
      id: string,
      owner: string,
      sessionId: string,
      inputs: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type EntryBySessionAndCreatedAtQueryVariables = {
  sessionId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EntryBySessionAndCreatedAtQuery = {
  entryBySessionAndCreatedAt?:  {
    __typename: "ModelEntryConnection",
    items?:  Array< {
      __typename: "Entry",
      id: string,
      owner: string,
      sessionId: string,
      inputs: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items?:  Array< {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id?: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListSessionsByOwnerQueryVariables = {
  owner?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsByOwnerQuery = {
  listSessionsByOwner?:  {
    __typename: "ModelSessionConnection",
    items?:  Array< {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCollaboratorInvitationQueryVariables = {
  id?: string,
};

export type GetCollaboratorInvitationQuery = {
  getCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListCollaboratorInvitationsQueryVariables = {
  filter?: ModelCollaboratorInvitationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollaboratorInvitationsQuery = {
  listCollaboratorInvitations?:  {
    __typename: "ModelCollaboratorInvitationConnection",
    items?:  Array< {
      __typename: "CollaboratorInvitation",
      id: string,
      email: string,
      sessionId: string,
      createdAt: string,
      updatedAt: string,
      session?:  {
        __typename: "Session",
        id: string,
        owner?: string | null,
        title: string,
        active: boolean,
        theme: string,
        proposals: string,
        images: string,
        email?: string | null,
        launcher: string,
        collaborators?: Array< string | null > | null,
        googleAnalyticsId?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCollaboratorInvitationsBySessionQueryVariables = {
  sessionId?: string | null,
  email?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCollaboratorInvitationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollaboratorInvitationsBySessionQuery = {
  listCollaboratorInvitationsBySession?:  {
    __typename: "ModelCollaboratorInvitationConnection",
    items?:  Array< {
      __typename: "CollaboratorInvitation",
      id: string,
      email: string,
      sessionId: string,
      createdAt: string,
      updatedAt: string,
      session?:  {
        __typename: "Session",
        id: string,
        owner?: string | null,
        title: string,
        active: boolean,
        theme: string,
        proposals: string,
        images: string,
        email?: string | null,
        launcher: string,
        collaborators?: Array< string | null > | null,
        googleAnalyticsId?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCoraboratorInvitationsByEmailQueryVariables = {
  email?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCollaboratorInvitationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoraboratorInvitationsByEmailQuery = {
  listCoraboratorInvitationsByEmail?:  {
    __typename: "ModelCollaboratorInvitationConnection",
    items?:  Array< {
      __typename: "CollaboratorInvitation",
      id: string,
      email: string,
      sessionId: string,
      createdAt: string,
      updatedAt: string,
      session?:  {
        __typename: "Session",
        id: string,
        owner?: string | null,
        title: string,
        active: boolean,
        theme: string,
        proposals: string,
        images: string,
        email?: string | null,
        launcher: string,
        collaborators?: Array< string | null > | null,
        googleAnalyticsId?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEntrySubscriptionVariables = {
  owner?: string,
};

export type OnCreateEntrySubscription = {
  onCreateEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEntrySubscriptionVariables = {
  owner?: string,
};

export type OnUpdateEntrySubscription = {
  onUpdateEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEntrySubscriptionVariables = {
  owner?: string,
};

export type OnDeleteEntrySubscription = {
  onDeleteEntry?:  {
    __typename: "Entry",
    id: string,
    owner: string,
    sessionId: string,
    inputs: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  owner?: string | null,
  collaborators?: string | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  owner?: string | null,
  collaborators?: string | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  owner?: string | null,
  collaborators?: string | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    title: string,
    active: boolean,
    theme: string,
    proposals: string,
    images: string,
    email?: string | null,
    launcher: string,
    collaborators?: Array< string | null > | null,
    googleAnalyticsId?: string | null,
    createdAt: string,
    updatedAt: string,
    collaboratorInvitations?:  {
      __typename: "ModelCollaboratorInvitationConnection",
      items?:  Array< {
        __typename: "CollaboratorInvitation",
        id: string,
        email: string,
        sessionId: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateCollaboratorInvitationSubscription = {
  onCreateCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateCollaboratorInvitationSubscription = {
  onUpdateCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteCollaboratorInvitationSubscription = {
  onDeleteCollaboratorInvitation?:  {
    __typename: "CollaboratorInvitation",
    id: string,
    email: string,
    sessionId: string,
    createdAt: string,
    updatedAt: string,
    session?:  {
      __typename: "Session",
      id: string,
      owner?: string | null,
      title: string,
      active: boolean,
      theme: string,
      proposals: string,
      images: string,
      email?: string | null,
      launcher: string,
      collaborators?: Array< string | null > | null,
      googleAnalyticsId?: string | null,
      createdAt: string,
      updatedAt: string,
      collaboratorInvitations?:  {
        __typename: "ModelCollaboratorInvitationConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};
