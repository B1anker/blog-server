import { IsOptional, IsString } from 'class-validator';

export class CreateSecretDto {
  @IsString()
  readonly value: string;

  @IsString()
  readonly key: string;

  @IsString()
  @IsOptional()
  readonly desc?: string;
}

export class UpdateSecretDto {
  @IsString()
  @IsOptional()
  readonly value?: string;

  @IsString()
  @IsOptional()
  readonly desc?: string;
}
