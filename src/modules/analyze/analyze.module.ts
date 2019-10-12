import { Visit } from '@/modules/analyze/analyze.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  controllers: [AnalyzeController],
  providers: [AnalyzeService],
  exports: [AnalyzeService]
})
export class AnalyzeModule {}
