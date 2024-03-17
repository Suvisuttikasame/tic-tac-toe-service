import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [SocketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
