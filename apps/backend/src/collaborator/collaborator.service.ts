import { Injectable } from '@nestjs/common'
import { InviteInputDTO } from './collaborator.dto'
import { mutations, queries } from '@botui/api'
import API, { GraphQLResult } from '@aws-amplify/api'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { v4 as uuidv4 } from 'uuid'
import Amplify from 'aws-amplify'
import dayjs = require('dayjs')
import { Collaborator } from '@botui/types'

if (process.env.AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.AWS_EXPORTS))

@Injectable()
export class CollaboratorService {
  async invite(input: InviteInputDTO): Promise<{ message: string }> {
    const listCoraborators = (await API.graphql({
      query: queries.listCoraboratorsBySession,
      variables: {
        sessionId: input.sessionId,
        email: { eq: input.email }
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    })) as GraphQLResult<{
      listCoraboratorsBySession: { items: Array<Collaborator> }
    }>

    const token = uuidv4()
    if (listCoraborators.data.listCoraboratorsBySession.items[0]) {
      await API.graphql({
        query: mutations.updateCollaborator,
        variables: {
          input: {
            id: listCoraborators.data.listCoraboratorsBySession.items[0].id,
            token,
            invitationExpireOn: dayjs().add(7, 'day').toDate()
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM
      })
    } else {
      await API.graphql({
        query: mutations.createCollaborator,
        variables: {
          input: {
            token,
            email: input.email,
            sessionId: input.sessionId,
            valid: false,
            invitationExpireOn: dayjs().add(7, 'day').toDate()
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM
      })
    }

    

    return { message: `create/updated collaborator by token: ${token}` }
  }
}
