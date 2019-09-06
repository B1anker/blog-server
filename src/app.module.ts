import LoggerMiddleware from '@/middlewares/logger';
import { ArchivesModule } from '@/modules/archives/archives.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { CategoryModule } from '@/modules/category/category.module';
import { DockerModule } from '@/modules/docker/docker.module';
import { PostModule } from '@/modules/post/post.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { UsersModule } from '@/modules/user/user.module';
import { WorkflowModule } from '@/modules/workflow/workflow.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    PostModule,
    UploadModule,
    CategoryModule,
    ArchivesModule,
    DockerModule,
    WorkflowModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
