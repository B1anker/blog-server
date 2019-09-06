import { Module } from '@nestjs/common';
import { DockerController } from './docker.controller';
import { DockerService } from './docker.service';

@Module({
  imports: [],
  controllers: [DockerController],
  providers: [DockerService],
  exports: [DockerService]
})
export class DockerModule {}
