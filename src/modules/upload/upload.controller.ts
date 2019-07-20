import { UploadService } from '@/modules/upload/upload.service';
import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('qiniuToken')
  public async getQiniuToken() {
    return {
      message: 'ok',
      token: await this.uploadService.getQiniuToken()
    };
  }
}
