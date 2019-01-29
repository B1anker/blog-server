import { CategoryService } from '@/modules/category/category.service';
import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAll() {
    return {
      message: 'ok',
      list: await this.categoryService.findAll(),
    };
  }

  @Get(':cid')
  public async find(@Param() params) {
    return {
      message: 'ok',
      post: await this.categoryService.find(params.cid)
    };
  }

  @Post()
  public async create(@Body(new ValidationPipe()) category: CreateCategoryDto) {
    try {
      await this.categoryService.create(category);
      return {
        message: 'ok'
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException(`分类"${category.name}"已存在！`);
      }
      throw err;
    }
  }

  @Put()
  public async update(@Body(new ValidationPipe()) category: UpdateCategoryDto) {
    try {
      await this.categoryService.update(category);
      return {
        message: 'ok'
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException(`分类"${category.name}"已存在！`);
      }
      throw err;
    }
  }

  @Delete(':cid')
  public async delete(@Param() params) {
    await this.categoryService.delete(params.cid);
    return {
      message: 'ok'
    };
  }
}
