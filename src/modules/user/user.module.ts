import { UsersController } from '@/modules/user/user.controller';
import { UsersService } from '@/modules/user/user.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Users } from './user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule) ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports: [ UsersService ]
})
export class UsersModule {}
