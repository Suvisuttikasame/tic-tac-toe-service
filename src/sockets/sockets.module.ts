import { Module } from '@nestjs/common';
import { SocketsService } from './sockets.service';
import { SocketsGateway } from './sockets.gateway';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [RoomModule],
  providers: [SocketsGateway, SocketsService],
})
export class SocketsModule {}
