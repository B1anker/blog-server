import { Repository } from 'typeorm';

import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

const dayjs = require('dayjs');
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Categories } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories) private readonly repository: Repository<Categories>
  ) {}

  public async findAll(): Promise<Categories[]> {
    const list = await this.repository.find();
    return list.filter(({ deleted }) => !deleted);
  }

  public async find(id: number): Promise<Categories> {
    const post = await this.repository.findOne({
      id
    });
    if (post.deleted) {
      return null;
    }
    return post;
  }

  public async create (createCategoryDto: CreateCategoryDto) {
    const category = new Categories();
    const now = dayjs().unix();
    category.created = now;
    category.updated = now;
    category.deleted = false;
    Object.assign(category, createCategoryDto);
    await this.repository.save(category);
    return category;
  }

  public async update (updateCategoryDto: UpdateCategoryDto) {
    const post = await this.find(updateCategoryDto.id);
    Object.assign(post, updateCategoryDto);
    post.updated = dayjs().unix();
    await this.repository.save(post);
    return post;
  }

  public async delete (id: number) {
    const post = await this.find(id);
    post.deleted = true;
    await this.repository.save(post);
    return post;
  }
}
