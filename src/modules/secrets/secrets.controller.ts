import { Roles } from '@/decorators/roles';
import { RolesGuard } from '@/guards/roles';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateSecretDto, UpdateSecretDto } from './secrets.dto';
import { SecretsService } from './secrets.service';

@Controller('/secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public async getSecrets() {
    return {
      message: 'ok',
      list: await this.secretsService.getSecrets()
    };
  }

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public async createSecret(
    @Body(new ValidationPipe()) createSecretDto: CreateSecretDto
  ) {
    return {
      message: 'ok',
      id: await this.secretsService.createSecret(createSecretDto)
    };
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public async updateSecret(
    @Param() params: {key: string},
    @Body(new ValidationPipe()) updateSecretDto: UpdateSecretDto
  ) {
    return {
      message: 'ok',
      id: await this.secretsService.updateSecret(params.key, updateSecretDto)
    };
  }

  @Delete(':key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  public async deleteSecret(@Param() params: {key: string}) {
    await this.secretsService.deleteSecret(params.key);
    return {
      message: 'ok'
    };
  }
}
