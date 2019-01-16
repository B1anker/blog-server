import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class AuthDto {
  @ValidateIf((auth) => auth.id)
  @IsNumber()
  readonly id?: number;

  @ValidateIf((auth) => auth.account)
  @IsString()
  readonly account?: string;

  @IsString()
  readonly password: string;
}
