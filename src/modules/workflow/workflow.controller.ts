import {
  Body,
  Controller,
  Put,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateClientIndexDto } from './workflow.dto';
import { WorkflowService } from './workflow.service';

@Controller('/workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @UseGuards(AuthGuard('bearer'))
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
