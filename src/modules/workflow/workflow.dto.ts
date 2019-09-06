import { IsString } from 'class-validator';

export class UpdateClientIndexDto {
  @IsString()
  readonly template: string;
}
