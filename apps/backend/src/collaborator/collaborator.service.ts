import { Injectable, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ChallangeInputDTO, RemoveInputDTO, InviteInputDTO } from './collaborator.dto'
import { mutations, queries } from '@botui/api'
import API, { GraphQLResult } from '@aws-amplify/api'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { v4 as uuidv4 } from 'uuid'
import Amplify from 'aws-amplify'
import dayjs = require('dayjs')
import { CollaboratorInvitation } from '@botui/types'
import sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
if (process.env.AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.AWS_EXPORTS))

const EXPIRE_DAY = 7
const additionalHeaders = {
  'x-api-key': process.env.GRAPHQL_API_KEY
}

@Injectable()
export class CollaboratorService {
  async invite(input: InviteInputDTO): Promise<{ message: string }> {
    const { data } = (await API.graphql(
      {
        query: queries.listCollaboratorInvitationsBySession,
        variables: {
          sessionId: input.sessionId,
          email: { eq: input.email }
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY
      },
      additionalHeaders
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
          },
          authMode: GRAPHQL_AUTH_MODE.API_KEY
        },
        additionalHeaders
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
          },
          authMode: GRAPHQL_AUTH_MODE.API_KEY
        },
        additionalHeaders
      )
    }

    await sgMail.send({
      to: input.email,
      from: 'no-reply@survaq.com',
      templateId: 'd-9899e84b861d46a881628503dadc0bf9',
      dynamicTemplateData: {
        code,
        session_title: input.sessionTitle,
        expire_day: EXPIRE_DAY
      }
    })

    return { message: `create/updated collaborator by code: ${code}` }
  }

  async challenge(input: ChallangeInputDTO, responce: Response): Promise<void> {
    const { data } = (await API.graphql({
      query: queries.listCoraboratorsByCodeAndEmail,
      variables: {
        code: input.code,
        email: { eq: input.email },
        filter: {
          invitationExpireOn: { gt: dayjs().toDate() }
        }
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY
    }, additionalHeaders)) as GraphQLResult<{
      listCoraboratorsByTokenAndEmail: { items: Array<CollaboratorInvitation> }
    }>

    const id =
      data.listCoraboratorsByTokenAndEmail.items[0]?.id
    if (!id) {
      responce
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Not found session. Please request for re-invite.' })
      return
    }

    await API.graphql(
      {
        query: mutations.deleteCollaboratorInvitation,
        variables: {
          input: { id }
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY
      },
      additionalHeaders
    )
    // TODO: session update

    responce.status(HttpStatus.OK).send({ message: 'Success!' })
  }

  async remove(input: RemoveInputDTO): Promise<{ message: string }> {
    await API.graphql({
      query: mutations.deleteCollaboratorInvitation,
      variables: {
        input: { id: input.id }
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY
    }, additionalHeaders)

    return { message: 'Success!' }
  }
}
