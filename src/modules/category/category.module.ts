import { CategoryController } from '@/modules/category/category.controller';
import { CategoryService } from '@/modules/category/category.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Categories } from './category.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Categories]), forwardRef(() => AuthModule) ],
  controllers: [ CategoryController ],
  providers: [ CategoryService ],
  exports: [ CategoryService ]
})
export class CategoryModule {}
