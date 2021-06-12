import { Injectable } from '@nestjs/common'
import { RemoveInputDTO, InviteInputDTO } from './collaborator.dto'
import { mutations } from '@botui/api'
import API, { GraphQLResult } from '@aws-amplify/api'
import Amplify from 'aws-amplify'
import sgMail = require('@sendgrid/mail')
import { GetInvitationAndSession, getInvitationAndSession, mutateInvitationAndSession } from './queries'

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
if (process.env.AWS_EXPORTS)
  Amplify.configure({
    ...JSON.parse(process.env.AWS_EXPORTS),
    aws_appsync_apiKey: process.env.GRAPHQL_API_KEY,
    aws_appsync_authenticationType: 'API_KEY'
  })

@Injectable()
export class CollaboratorService {
  async invite(
    input: InviteInputDTO
  ): Promise<{ message: string; statusCode?: number }> {
    const { data } = (await API.graphql({
      query: getInvitationAndSession,
      variables: {
        sessionId: input.sessionId,
        email: input.email
      }
    })) as GraphQLResult<GetInvitationAndSession>

    const { invitation, session } = data
    if (!session) return { message: 'シナリオが存在しません', statusCode: 404 }
    if (invitation.items.length < 1)
      await API.graphql({
        query: mutations.createCollaboratorInvitation,
        variables: {
          input: {
            email: input.email,
            sessionId: input.sessionId
          }
        }
      })

    await API.graphql({
      query: mutations.updateSession,
      variables: {
        input: {
          id: session.id,
          collaborators: [
            ...new Set([...(session.collaborators ?? []), input.email])
          ]
        }
      }
    })

    if (invitation.items.length < 1)
      await sgMail.send({
        to: input.email,
        from: 'no-reply@survaq.com',
        templateId: 'd-9899e84b861d46a881628503dadc0bf9',
        dynamicTemplateData: {
          session_title: session.title
        }
      })

    return { message: 'コラポレーターを追加しました。' }
  }

  async remove(input: RemoveInputDTO): Promise<{ message: string; statusCode?: 404 }> {
    const { data } = (await API.graphql({
      query: getInvitationAndSession,
      variables: {
        email: input.email,
        sessionId: input.sessionId
      }
    })) as GraphQLResult<GetInvitationAndSession>

    const { session, invitation } = data
    if (!session) return { message: 'シナリオが存在しません', statusCode: 404 }

    await API.graphql({
      query: mutateInvitationAndSession,
      variables: {
        sessionId: session.id,
        newCollaborators: (session.collaborators ?? []).filter(
          (email) => email !== input.email
        ),
        invitationId: invitation.items[0]?.id ?? 'noInvitation'
      }
    })

    return { message: 'コラポレーターを削除しました。' }
  }
}
