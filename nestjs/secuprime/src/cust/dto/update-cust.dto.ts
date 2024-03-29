import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCustDTO {
  @IsNotEmpty()
  @IsString()
  guestName: string;

  @IsDateString()
  @IsString()
  guestBirth: Date;

  @IsNotEmpty()
  @IsString()
  guestHp: string;

  @IsNotEmpty()
  @IsString()
  guestAddr: string;

  @IsNotEmpty()
  @IsEmail()
  guestMail: string;
}
