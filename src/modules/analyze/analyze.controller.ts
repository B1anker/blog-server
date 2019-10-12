import { Body, Controller, Get, Put, ValidationPipe } from '@nestjs/common';
import { UpdatePvDto, UpdateUvDto } from './analyze.dto';
import { AnalyzeService } from './analyze.service';

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Get('pv')
  public async pv() {
    return {
      message: 'ok',
      data: {
        pv: Number(await this.analyzeService.pv())
      }
    };
  }

  @Put('pv')
  public async updatePv(@Body(new ValidationPipe()) updatePvDto: UpdatePvDto) {
    await this.analyzeService.updatePv(updatePvDto.from);
    return {
      message: 'ok'
    };
  }

  @Get('uv')
  public async uv() {
    return {
      message: 'ok',
      data: {
        uv: Number(await this.analyzeService.uv())
      }
    };
  }

  @Put('uv')
  public async updateUv(@Body(new ValidationPipe()) updateUvDto: UpdateUvDto) {
    await this.analyzeService.updateUv(updateUvDto.from);
    return {
      message: 'ok'
    };
  }
}
