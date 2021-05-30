import { Injectable } from '@nestjs/common';
import { InviteInputDTO } from './collaborator.dto';

@Injectable()
export class CollaboratorService {
  invite(input: InviteInputDTO): { message: string } {
    return { message: input.email }
  }
}
