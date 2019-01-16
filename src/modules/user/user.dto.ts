import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly account: string;

  @IsString()
  readonly password: string;
}

export class AccoutDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly account: string;
}

export class PasswordDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly password: string;
}

export class RoleDto {
  @IsNumber()
  readonly id: number;

  @IsArray()
  readonly roles: string[];
}
