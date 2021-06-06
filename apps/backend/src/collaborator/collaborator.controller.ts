import { Controller, Post, Body } from '@nestjs/common'
import {
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

  @Post('remove')
  eject(@Body() removeInput: RemoveInputDTO) {
    return this.collaboratorService.remove(removeInput)
  }
}
