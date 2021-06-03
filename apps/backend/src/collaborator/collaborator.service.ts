import { Injectable, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import {
  ChallangeInputDTO,
  RemoveInputDTO,
  InviteInputDTO
} from './collaborator.dto'
import { mutations, queries } from '@botui/api'
import API, { GraphQLResult } from '@aws-amplify/api'
import { v4 as uuidv4 } from 'uuid'
import Amplify from 'aws-amplify'
import dayjs = require('dayjs')
import { CollaboratorInvitation, Session } from '@botui/types'
import sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
if (process.env.AWS_EXPORTS)
  Amplify.configure({
    ...JSON.parse(process.env.AWS_EXPORTS),
    aws_appsync_apiKey: process.env.GRAPHQL_API_KEY,
    aws_appsync_authenticationType: 'API_KEY'
  })

const EXPIRE_DAY = 7

@Injectable()
export class CollaboratorService {
  async invite(input: InviteInputDTO): Promise<{ message: string }> {
    const { data } = (await API.graphql(
      {
        query: queries.listCollaboratorInvitationsBySession,
        variables: {
          sessionId: input.sessionId,
          email: { eq: input.email }
        }
      }
    )) as GraphQLResult<{
      listCollaboratorInvitationsBySession: {
        items: Array<CollaboratorInvitation>
      }
    }>

    const code = uuidv4()
    if (data.listCollaboratorInvitationsBySession.items[0]) {
      await API.graphql(
        {
          query: mutations.updateCollaboratorInvitation,
          variables: {
            input: {
              id: data.listCollaboratorInvitationsBySession.items[0].id,
              code,
              expireOn: dayjs().add(EXPIRE_DAY, 'day').toDate()
            }
          }
        }
      )
    } else {
      await API.graphql(
        {
          query: mutations.createCollaboratorInvitation,
          variables: {
            input: {
              code,
              email: input.email,
              sessionId: input.sessionId,
              expireOn: dayjs().add(EXPIRE_DAY, 'day').toDate()
            }
          }
        }
      )
    }

    await sgMail.send({
      to: input.email,
      from: 'no-reply@survaq.com',
      templateId: 'd-9899e84b861d46a881628503dadc0bf9',
      dynamicTemplateData: {
        token: code,
        session_title: input.sessionTitle,
        expire_day: EXPIRE_DAY
      }
    })

    return { message: `create/updated collaborator by code: ${code}` }
  }

  async challenge(input: ChallangeInputDTO, responce: Response): Promise<void> {
    const {
      data: { listCoraboratorsByCodeAndEmail: collaborators }
    } = (await API.graphql(
      {
        query: queries.listCoraboratorsByCodeAndEmail,
        variables: {
          code: input.code,
          email: { eq: input.email },
          filter: {
            expireOn: { gt: dayjs().toDate() }
          }
        }
      }
    )) as GraphQLResult<{
      listCoraboratorsByCodeAndEmail: { items: Array<CollaboratorInvitation> }
    }>

    const [collaborator] = collaborators.items
    if (!collaborator) {
      responce
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Not found session. Please request for re-invite.' })
      return
    }

    const {
      data: { getSession: session }
    } = (await API.graphql(
      {
        query: queries.getSession,
        variables: {
          id: collaborator.sessionId
        }
      }
    )) as GraphQLResult<{
      getSession: Session
    }>
    await API.graphql(
      {
        query: mutations.updateSession,
        variables: {
          input: {
            id: session.id,
            collaborators: [...(session.collaborators ?? []), collaborator.email]
          }
        }
      }
    )

    await API.graphql(
      {
        query: mutations.deleteCollaboratorInvitation,
        variables: {
          input: { id: collaborator.id }
        }
      }
    )

    responce.status(HttpStatus.OK).send({ message: 'Success!' })
  }

  async remove(input: RemoveInputDTO): Promise<{ message: string }> {
    await API.graphql(
      {
        query: mutations.deleteCollaboratorInvitation,
        variables: {
          input: { id: input.id }
        }
      }
    )

    return { message: 'Success!' }
  }
}
