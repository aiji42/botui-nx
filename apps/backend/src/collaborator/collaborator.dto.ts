import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class InviteInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  sessionId: string
}
