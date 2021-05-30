import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class InviteInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  sessionId: string
}

export class ChallangeInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  token: string

  @IsNotEmpty()
  @IsString()
  userId: string
}
