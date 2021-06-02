import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  ChallangeInputDTO,
  RemoveInputDTO,
  InviteInputDTO
} from './collaborator.dto'
import { CollaboratorService } from './collaborator.service'

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post('invite')
  invite(@Body() inviteInput: InviteInputDTO) {
    return this.collaboratorService.invite(inviteInput)
  }

  @Post('challenge')
  challenge(
    @Body() challengeInput: ChallangeInputDTO,
    @Res() response: Response
  ) {
    return this.collaboratorService.challenge(challengeInput, response)
  }

  @Post('remove')
  eject(@Body() removeInput: RemoveInputDTO) {
    return this.collaboratorService.remove(removeInput)
  }r
}
