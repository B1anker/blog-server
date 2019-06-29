import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly account: string;

  @IsString()
  readonly password: string;

  @IsArray()
  readonly roles: string[];
}

export class AccoutUpdateDto {
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly account: string;

  @IsOptional()
  @IsArray()
  readonly roles: string[];

  @IsOptional()
  @IsString()
  readonly password: string;
}
