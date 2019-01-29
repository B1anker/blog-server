import { PostController } from '@/modules/post/post.controller';
import { PostService } from '@/modules/post/post.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Posts } from './post.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Posts]), forwardRef(() => AuthModule) ],
  controllers: [ PostController ],
  providers: [ PostService ],
  exports: [ PostService ]
})
export class PostModule {}
