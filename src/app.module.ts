import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity';
import { LogService } from 'src/common/services/log.service';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '5534',
      database: "int_db",
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [LogService],
})

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [LogService],
})

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LogService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
