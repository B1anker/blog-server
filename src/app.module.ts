import LoggerMiddleware from '@/middlewares/logger';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { RolesGuard } from './guards/roles';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard
  //   }
  // ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('/');
  }
}
