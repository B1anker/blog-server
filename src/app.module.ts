import LoggerMiddleware from '@/middlewares/logger';
import { AnalyzeModule } from '@/modules/analyze/analyze.module';
import { ArchivesModule } from '@/modules/archives/archives.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { CategoryModule } from '@/modules/category/category.module';
import { DockerModule } from '@/modules/docker/docker.module';
import { PostModule } from '@/modules/post/post.module';
import { SecretsModule } from '@/modules/secrets/secrets.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { UsersModule } from '@/modules/user/user.module';
import { WorkflowModule } from '@/modules/workflow/workflow.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      database: 'blog',
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true
    }),
    AnalyzeModule,
    UsersModule,
    AuthModule,
    PostModule,
    UploadModule,
    CategoryModule,
    ArchivesModule,
    DockerModule,
    WorkflowModule,
    SecretsModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
