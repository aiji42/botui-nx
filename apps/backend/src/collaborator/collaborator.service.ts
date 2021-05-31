import { Injectable, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ChallangeInputDTO, EjectInputDTO, InviteInputDTO } from './collaborator.dto'
import { mutations, queries } from '@botui/api'
import API, { GraphQLResult } from '@aws-amplify/api'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { v4 as uuidv4 } from 'uuid'
import Amplify from 'aws-amplify'
import dayjs = require('dayjs')
import { Collaborator } from '@botui/types'
import sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
if (process.env.AWS_EXPORTS)
  Amplify.configure(JSON.parse(process.env.AWS_EXPORTS))

const EXPIRE_DAY = 7

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
            invitationExpireOn: dayjs().add(EXPIRE_DAY, 'day').toDate()
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
            invitationExpireOn: dayjs().add(EXPIRE_DAY, 'day').toDate()
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM
      })
    }

    await sgMail.send({
      to: input.email,
      from: 'no-reply@survaq.com',
      templateId: 'd-9899e84b861d46a881628503dadc0bf9',
      dynamicTemplateData: {
        token,
        session_title: input.sessionTitle,
        expire_day: EXPIRE_DAY
      }
    })

    return { message: `create/updated collaborator by token: ${token}` }
  }

  async challenge(input: ChallangeInputDTO, responce: Response): Promise<void> {
    const listCoraborators = (await API.graphql({
      query: queries.listCoraboratorsByTokenAndEmail,
      variables: {
        token: input.token,
        email: { eq: input.email },
        filter: {
          invitationExpireOn: { gt: dayjs().toDate() }
        }
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    })) as GraphQLResult<{
      listCoraboratorsByTokenAndEmail: { items: Array<Collaborator> }
    }>

    const id =
      listCoraborators.data.listCoraboratorsByTokenAndEmail.items[0]?.id
    if (!id) {
      responce
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Not found session. Please request for re-invite.' })
      return
    }

    await API.graphql({
      query: mutations.updateCollaborator,
      variables: {
        input: { id, valid: true, userId: input.userId }
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    })

    responce.status(HttpStatus.OK).send({ message: 'Success!' })
  }

  async eject(input: EjectInputDTO): Promise<{ message: string }> {
    await API.graphql({
      query: mutations.deleteCollaborator,
      variables: {
        input: { id: input.id }
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    })

    return { message: 'Success!' }
  }
}
