import { staticAssetsPath } from '@/app.config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class WorkflowService {
  public async updateBlogIndex(template: string) {
    const indexHtmlPath: string = `${staticAssetsPath}/index.html`;
    fs.writeFileSync(indexHtmlPath, template, {
      encoding: 'utf8'
    });
    return template;
  }
}
