import { PostService } from '@/modules/post/post.service';
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async findAll() {
    return {
      message: 'ok',
      list: await this.postService.findAll(),
    };
  }

  @Get(':pid')
  public async find(@Param() params) {
    return {
      message: 'ok',
      post: await this.postService.find(params.pid)
    };
  }

  @Post()
  public async create(@Body(new ValidationPipe()) post: CreatePostDto) {
    await this.postService.create(post);
    return {
      message: 'ok'
    };
  }

  @Put()
  public async update(@Body(new ValidationPipe()) post: UpdatePostDto) {
    await this.postService.update(post);
    return {
      message: 'ok'
    };
  }

  @Delete(':pid')
  public async delete(@Param() params) {
    await this.postService.delete(params.pid);
    return {
      message: 'ok'
    };
  }
}
