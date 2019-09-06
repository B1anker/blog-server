import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  ValidationPipe
} from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('/docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('/containers')
  public async getContainers() {
    return {
      message: 'ok',
      list: await this.dockerService.getContainers()
    };
  }
}
