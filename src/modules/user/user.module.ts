import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Users } from './user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule) ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ]
})
export class UsersModule {}
