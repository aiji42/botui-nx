import { useState, useEffect } from 'react'
import {
  CreateParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  UpdateParams
} from 'react-admin'
import { buildDataProvider } from 'react-admin-amplify'
import { DataProvider } from 'react-admin-amplify/build/providers/DataProvider'
import { Session } from '@botui/types'
import { mutations, queries } from '@botui/api'
import { Auth } from 'aws-amplify'
import gql from 'graphql-tag'
import buildHasuraProvider, { buildFields } from 'ra-data-hasura'
import { DocumentNode } from '@apollo/client'

const sessionParse = (
  data: Session<string, string, string, string>
): Session => {
  const proposals = data.proposals ? JSON.parse(data.proposals) : []
  const theme = data.theme ? JSON.parse(data.theme) : {}
  const images = data.images ? JSON.parse(data.images) : {}
  const launcher = data.launcher ? JSON.parse(data.launcher) : {}
  return { ...data, proposals, theme, images, launcher }
}

const sessionFormat = (
  data: Session
): Session<string, string, string, string> => {
  const proposals = data.proposals ? JSON.stringify(data.proposals) : '[]'
  const theme = data.theme ? JSON.stringify(data.theme) : '{}'
  const images = data.images ? JSON.stringify(data.images) : '{}'
  const launcher = data.launcher ? JSON.stringify(data.launcher) : '{}'
  return { ...data, proposals, theme, images, launcher }
}

const defaultDataProvider = buildDataProvider({ queries, mutations })
const dataProvider = {
  ...defaultDataProvider,
  getList: async (resource: string, params: GetListParams) => {
    if (resource === 'sessions') {
      const info = await Auth.currentUserInfo()
      const result = await defaultDataProvider.getList<
        Session<string, string, string, string>
      >(resource, {
        ...params,
        filter: { listSessionsByOwner: { owner: info.username } }
      })
      return {
        ...result,
        data: result.data.map(sessionParse)
      }
    }
    if (resource === 'collaboratorInvitations') {
      const info = await Auth.currentUserInfo()
      return await defaultDataProvider.getList(resource, {
        ...params,
        filter: {
          listCoraboratorInvitationsByEmail: {
            email: info.attributes.email,
            status: { eq: 'active' }
          }
        }
      })
    }
    return await defaultDataProvider.getList(resource, params)
  },
  getOne: async (resource: string, params: GetOneParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getOne(resource, params)

    const result = await defaultDataProvider.getOne<
      Session<string, string, string, string>
    >(resource, params)
    return {
      ...result,
      data: sessionParse(result.data)
    }
  },
  getMany: async (resource: string, params: GetManyParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.getMany(resource, params)

    const result = await defaultDataProvider.getMany<
      Session<string, string, string, string>
    >(resource, params)
    return {
      ...result,
      data: result.data.map(sessionParse)
    }
  },
  update: async (resource: string, params: UpdateParams) => {
    if (resource !== 'sessions')
      return defaultDataProvider.update(resource, params)

    const { collaboratorInvitations, collaborators, ...data } = sessionFormat(
      params.data
    )
    const result = await defaultDataProvider.update<
      Session<string, string, string, string>
    >(resource, {
      ...params,
      data
    })
    return {
      ...result,
      data: sessionParse(result.data)
    }
  },
  create: async (resource: string, params: CreateParams) => {
    if (resource !== 'sessions')
      return await defaultDataProvider.create(resource, params)

    const result = await defaultDataProvider.create<
      Session<string, string, string, string>
    >(resource, { ...params, data: { ...params.data } })
    return {
      ...result,
      data: sessionParse(result.data)
    }
  }
} as DataProvider

export const useDataProvider = (): DataProvider => dataProvider

const useOwner = () => {
  const [dataProvider, setDataProvider] = useState(null)

  useEffect(() => {
    const buildDataProvider = async () => {
      const userInfo = await Auth.currentUserInfo()
      const dp = await buildHasuraProvider(
        {
          clientOptions: {
            uri: 'https://botui.hasura.app/v1/graphql',
            headers: {
              'x-hasura-admin-secret': process.env.NX_HASURA_ADMIN_SECRET,
              'x-hasura-role': 'owner',
              'x-hasura-user-id': userInfo.attributes.email
            }
          }
        },
        { buildFields: customBuildFields }
      )
      setDataProvider(() => dp)
    }
    buildDataProvider()
  }, [])

  return dataProvider
}

const useCollaborator = () => {
  const [dataProvider, setDataProvider] = useState(null)

  useEffect(() => {
    const buildDataProvider = async () => {
      const userInfo = await Auth.currentUserInfo()
      const dp = await buildHasuraProvider(
        {
          clientOptions: {
            uri: 'https://botui.hasura.app/v1/graphql',
            headers: {
              'x-hasura-admin-secret': process.env.NX_HASURA_ADMIN_SECRET,
              'x-hasura-role': 'collaborator',
              'x-hasura-user-id': userInfo.attributes.email
            }
          }
        },
        { buildFields: customBuildFields }
      )
      setDataProvider(() => dp)
    }
    buildDataProvider()
  }, [])

  return dataProvider
}

const extractFieldsFromQuery = (queryAst: DocumentNode) => {
  const [definition] = queryAst.definitions
  if (!('selectionSet' in definition)) throw new Error
  return definition.selectionSet.selections
}

const customBuildFields = (type, fetchType) => {
  const resourceName = type.name

  if (resourceName === 'users' && fetchType === 'GET_ONE') {
    return extractFieldsFromQuery(GET_ONE_USER)
  }

  // No custom query defined, so use the default query fields (all, but no related/nested).
  return buildFields(type, fetchType)
}
