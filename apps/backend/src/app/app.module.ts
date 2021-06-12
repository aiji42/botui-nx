import { Module } from '@nestjs/common'
import { CollaboratorController } from '../collaborator/collaborator.controller'
import { CollaboratorService } from '../collaborator/collaborator.service'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController, CollaboratorController],
  providers: [AppService, CollaboratorService]
})
export class AppModule {}
