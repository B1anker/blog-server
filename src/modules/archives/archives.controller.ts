import {
  Controller,
  Get,
} from '@nestjs/common';
import { ArchivesService } from './archives.service';

@Controller('archives')
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) {}

  @Get('timeline')
  public async getTimeline() {
    return {
      message: 'ok',
      archives: await this.archivesService.getTimeline()
    };
  }
}
