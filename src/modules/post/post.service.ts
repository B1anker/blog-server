import ObjectId from 'bson-objectid';
import { Repository } from 'typeorm';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

const dayjs = require('dayjs');
import { Categories } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Posts } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private readonly repository: Repository<Posts>,
    @Inject(forwardRef(() => CategoryService)) private readonly categorySevice: CategoryService,
  ) {}

  public async findAll(): Promise<Posts[]> {
    const list = await this.repository.find({
      relations: ['categories'],
    });
    list.sort((a, b) => {
      return b.created - a.created;
    });
    return list.filter(({ deleted }) => !deleted).map((l) => {
      l.categories.forEach((category) => delete category.deleted);
      return l;
    });
  }

  public async find(id: string): Promise<Posts> {
    const post = await this.repository.findOne(id, {
      relations: ['categories'],
    });
    if (post.deleted) {
      return null;
    }
    return post;
  }

  public async create(createPostDto: CreatePostDto) {
    const post = new Posts();
    const now = dayjs().unix();
    const categories: Categories[] = [];
    for (let i = 0; i < createPostDto.categories.length; i++) {
      categories.push(
        await this.categorySevice.find(Number(createPostDto.categories[i])),
      );
    }
    Object.assign(post, createPostDto);
    post.created = now;
    post.updated = now;
    post.views = 0;
    post.id = ObjectId.generate();
    post.deleted = false;
    post.categories = categories;
    await this.repository.save(post);
    return post;
  }

  public async update(updatePostDto: UpdatePostDto) {
    const post = await this.find(updatePostDto.id);
    const categories: Categories[] = [];
    for (let i = 0; i < updatePostDto.categories.length; i++) {
      categories.push(
        await this.categorySevice.find(Number(updatePostDto.categories[i]))
      );
    }
    Object.assign(post, updatePostDto);
    post.categories = categories;
    post.updated = dayjs().unix();
    await this.repository.save(post);
    return post;
  }

  public async delete(id: string) {
    const post = await this.find(id);
    post.deleted = true;
    await this.repository.save(post);
    return post;
  }
}
