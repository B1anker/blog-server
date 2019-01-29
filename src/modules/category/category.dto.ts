import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNumber()
  readonly id: number;
}
