import { Injectable } from '@nestjs/common'
import { RemoveInputDTO, InviteInputDTO } from './collaborator.dto'
import { mutations, queries } from '@botui/api'
import API, { GraphQLResult } from '@aws-amplify/api'
import Amplify from 'aws-amplify'
import { CollaboratorInvitation, Session } from '@botui/types'
import sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
if (process.env.AWS_EXPORTS)
  Amplify.configure({
    ...JSON.parse(process.env.AWS_EXPORTS),
    aws_appsync_apiKey: process.env.GRAPHQL_API_KEY,
    aws_appsync_authenticationType: 'API_KEY'
  })

@Injectable()
export class CollaboratorService {
  async invite(input: InviteInputDTO): Promise<{ message: string }> {
    const { data } = (await API.graphql({
      query: queries.listCollaboratorInvitationsBySession,
      variables: {
        sessionId: input.sessionId,
        email: { eq: input.email }
      }
    })) as GraphQLResult<{
      listCollaboratorInvitationsBySession: {
        items: Array<CollaboratorInvitation>
      }
    }>

    const [invitation] = data.listCollaboratorInvitationsBySession.items
    if (invitation) {
      return { message: 'No need to invite' }
    } else {
      await API.graphql({
        query: mutations.createCollaboratorInvitation,
        variables: {
          input: {
            email: input.email,
            sessionId: input.sessionId
          }
        }
      })
    }

    const {
      data: { getSession: session }
    } = (await API.graphql({
      query: queries.getSession,
      variables: {
        id: input.sessionId
      }
    })) as GraphQLResult<{
      getSession: Session
    }>

    await API.graphql({
      query: mutations.updateSession,
      variables: {
        input: {
          id: session.id,
          collaborators: [
            ...(session.collaborators ?? []).filter(
              (email) => email !== input.email
            ),
            input.email
          ]
        }
      }
    })

    await sgMail.send({
      to: input.email,
      from: 'no-reply@survaq.com',
      templateId: 'd-9899e84b861d46a881628503dadc0bf9',
      dynamicTemplateData: {
        session_title: session.title
      }
    })

    return { message: 'Success' }
  }

  async remove(input: RemoveInputDTO): Promise<{ message: string }> {
    const {
      data: { getSession: session }
    } = (await API.graphql({
      query: queries.getSession,
      variables: {
        id: input.sessionId
      }
    })) as GraphQLResult<{
      getSession: Session
    }>
    await API.graphql({
      query: mutations.updateSession,
      variables: {
        input: {
          id: input.sessionId,
          collaborators: session.collaborators.filter(
            (email) => email !== input.email
          )
        }
      }
    })

    const { data } = (await API.graphql({
      query: queries.listCollaboratorInvitationsBySession,
      variables: {
        sessionId: input.sessionId,
        email: { eq: input.email }
      }
    })) as GraphQLResult<{
      listCollaboratorInvitationsBySession: {
        items: Array<CollaboratorInvitation>
      }
    }>

    const [invitation] = data.listCollaboratorInvitationsBySession.items
    if (invitation) {
      await API.graphql({
        query: mutations.deleteCollaboratorInvitation,
        variables: {
          input: { id: invitation.id }
        }
      })
    }

    return { message: 'Success!' }
  }
}
