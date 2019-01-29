import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly tags: string[];

  @IsArray()
  readonly categories: string[];

  @IsString()
  readonly summary: string;

  @IsString()
  readonly content: string;
}

export class UpdatePostDto extends CreatePostDto {
  @IsString()
  readonly id: string;
}
