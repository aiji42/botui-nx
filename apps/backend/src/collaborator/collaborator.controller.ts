import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  RemoveInputDTO,
  InviteInputDTO
} from './collaborator.dto'
import { CollaboratorService } from './collaborator.service'

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post('invite')
  async invite(@Body() inviteInput: InviteInputDTO, @Res() res: Response) {
    const result = await this.collaboratorService.invite(inviteInput)
    if ('statusCode' in result) {
      res.status(result.statusCode).send({ message: result.message })
      return
    }

    res.send(result)
  }

  @Post('remove')
  async eject(@Body() removeInput: RemoveInputDTO, @Res() res: Response) {
    const result = await this.collaboratorService.remove(removeInput)
    if ('statusCode' in result) {
      res.status(result.statusCode).send({ message: result.message })
      return
    }

    res.send(result)
  }
}
