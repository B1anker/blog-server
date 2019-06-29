import { Posts } from '@/modules/post/post.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivesController } from './archives.controller';
import { ArchivesService } from './archives.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts])
  ],
  controllers: [ArchivesController],
  providers: [ArchivesService],
  exports: [ArchivesService],
})
export class ArchivesModule {}
