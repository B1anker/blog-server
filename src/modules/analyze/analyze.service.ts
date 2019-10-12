import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from './analyze.entity';

export interface Archive {
  title: string;
  created: number;
  id: string;
}

@Injectable()
export class AnalyzeService {
  constructor(
    @InjectRepository(Visit) private readonly repository: Repository<Visit>
  ) {}

  public async pv (): Promise<number> {
    return this.repository.query(`SELECT sum(count) as count FROM visit where type = 'pv'`).then((res) => {
      return res && res[0] && res[0].count || 0;
    });
  }

  public async updatePv(from: string) {
    let pv = await this.repository.findOne({
      type: 'pv',
      from
    });
    if (!pv) {
      pv = new Visit();
      pv.type = 'pv';
      pv.count = 1;
      pv.from = from;
    } else {
      pv.count++;
    }
    this.repository.save(pv);
  }

  public async uv (): Promise<number> {
    return this.repository.query(`SELECT sum(count) as count FROM visit where type = 'uv'`).then((res) => {
      return res && res[0] && res[0].count || 0;
    });
  }

  public async updateUv(from: string) {
    let uv = await this.repository.findOne({
      type: 'uv',
      from
    });
    if (!uv) {
      uv = new Visit();
      uv.type = 'uv';
      uv.count = 1;
      uv.from = from;
    } else {
      uv.count++;
    }
    this.repository.save(uv);
  }
}
