import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SecretsController } from './secrets.controller';
import { Secrets } from './secrets.entity';
import { SecretsService } from './secrets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Secrets]),
    forwardRef(() => AuthModule)
  ],
  controllers: [ SecretsController ],
  providers: [ SecretsService ],
  exports: [ SecretsService ]
})
export class SecretsModule {}
