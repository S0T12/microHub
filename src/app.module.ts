import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        options: {
          urls: ['amqp://localhost:5672/hello'],
          queue: 'users_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
