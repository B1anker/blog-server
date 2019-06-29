import { Repository } from 'typeorm';

import { Posts } from '@/modules/post/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';

export interface Archive {
  title: string;
  created: number;
  id: string;
}

@Injectable()
export class ArchivesService {
  constructor(
    @InjectRepository(Posts) private readonly repository: Repository<Posts>
  ) {}

  public async getTimeline(): Promise<Archive[]> {
    const posts = await this.repository.find();
    posts.sort((a, b) => {
      return b.created - a.created;
    });
    return posts.filter(({ deleted }) => !deleted).map((post) => {
      return pick(post, [
        'created',
        'title',
        'id'
      ]);
    });
  }
}
