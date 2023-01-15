import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly token: string;
}
