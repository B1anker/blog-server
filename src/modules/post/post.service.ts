import ObjectId from 'bson-objectid';
import { Repository } from 'typeorm';

import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as dayjs from 'dayjs';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Posts } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private readonly repository: Repository<Posts>
  ) {}

  public async findAll(): Promise<Posts[]> {
    const list = await this.repository.find();
    return list.filter(({ deleted }) => !deleted);
  }

  public async find(id: string): Promise<Posts> {
    const post = await this.repository.findOne({
      id
    });
    if (post.deleted) {
      return null;
    }
    return post;
  }

  public async create (createPostDto: CreatePostDto) {
    const post = new Posts();
    const now = dayjs().unix();
    post.created = now;
    post.updated = now;
    post.views = 0;
    post.id = ObjectId.generate();
    post.deleted = false;
    Object.assign(post, createPostDto);
    await this.repository.save(post);
    return post;
  }

  public async update (updatePostDto: UpdatePostDto) {
    const post = await this.find(updatePostDto.id);
    Object.assign(post, updatePostDto);
    post.updated = dayjs().unix();
    await this.repository.save(post);
    return post;
  }

  public async delete (id: string) {
    const post = await this.find(id);
    post.deleted = true;
    await this.repository.save(post);
    return post;
  }
}
