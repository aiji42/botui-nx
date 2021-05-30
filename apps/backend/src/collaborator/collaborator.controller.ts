import { Controller, Post, Body } from '@nestjs/common';
import { InviteInputDTO } from './collaborator.dto';
import { CollaboratorService } from './collaborator.service';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) { }

  @Post('invite')
  invite(@Body() inviteInput: InviteInputDTO) {
    return this.collaboratorService.invite(inviteInput)
  }
}
