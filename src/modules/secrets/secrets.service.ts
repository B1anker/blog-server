import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ObjectId from 'bson-objectid';
import * as dayjs from 'dayjs';
import { omit } from 'lodash';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateSecretDto, UpdateSecretDto } from './secrets.dto';
import { Secrets } from './secrets.entity';

@Injectable()
export class SecretsService {
  public constructor(
    @InjectRepository(Secrets) private readonly repository: Repository<Secrets>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  public async getSecrets() {
    const list = await this.repository.find();
    return list
      .filter((secret) => {
        return !secret.deleted;
      })
      .sort((a, b) => {
        return b.created - a.created;
      })
      .map((secret) => omit(secret, ['deleted', 'value']));
  }

  public async getSecret(key: string) {
    const secret = await this.repository.findOne({
      key
    });
    return secret;
  }

  public async createSecret(createSecretDto: CreateSecretDto) {
    const secret = new Secrets();
    const now = dayjs().unix();
    Object.assign(secret, createSecretDto);
    try {
      secret.key = createSecretDto.key;
      secret.value = await this.authService.encrypt(createSecretDto.value);
      secret.created = now;
      secret.updated = now;
      secret.id = ObjectId.generate();
      secret.deleted = false;
      await this.repository.save(secret);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new InternalServerErrorException({
          status: 'ER_DUP_ENTRY',
          message: `${secret.key}已存在`
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
    return secret.id;
  }

  public async updateSecret(key: string, updateSecretDto: UpdateSecretDto) {
    const secret = await this.repository.findOne({
      key
    });
    const now = dayjs().unix();
    if (!updateSecretDto.value && !secret.desc) {
      throw new BadRequestException({ message: `value和desc必须存在一个` });
    }
    try {
      if (updateSecretDto.value) {
        secret.value = await this.authService.encrypt(updateSecretDto.value);
      }
      if (secret.desc) {
        secret.desc = updateSecretDto.desc;
      }
      secret.updated = now;
      await this.repository.save(secret);
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return secret.id;
  }

  public async deleteSecret(key: string) {
    const secret = await this.repository.findOne({
      key
    });
    const now = dayjs().unix();
    try {
      secret.deleted = true;
      secret.updated = now;
      await this.repository.save(secret);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
