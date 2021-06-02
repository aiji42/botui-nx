import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class InviteInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  sessionId: string

  @IsNotEmpty()
  @IsString()
  sessionTitle: string
}

export class ChallangeInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsString()
  userId: string
}

export class RemoveInputDTO {
  @IsNotEmpty()
  @IsString()
  id: string
}