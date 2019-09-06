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
import { UpdateClientIndexDto } from './workflow.dto';
import { WorkflowService } from './workflow.service';

@Controller('/workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Put('/update/blog/index')
  public async updateBlogIndex(
    @Body(new ValidationPipe()) updateClientIndexDto: UpdateClientIndexDto
  ) {
    return {
      message: 'ok',
      template: await this.workflowService.updateBlogIndex(
        updateClientIndexDto.template
      )
    };
  }
}
