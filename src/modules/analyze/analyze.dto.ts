import { IsString } from 'class-validator';

export class UpdatePvDto {
  @IsString()
  readonly from: string;
}

export class UpdateUvDto {
  @IsString()
  readonly from: string;
}
