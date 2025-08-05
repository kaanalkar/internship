import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity';
import { LogService } from './log.service';

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

export class AppModule {}

