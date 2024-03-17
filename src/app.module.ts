import { Module } from '@nestjs/common';
import { SocketsModule } from './sockets/sockets.module';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017', {
      dbName: 'ticTacToe',
    }),
    SocketsModule,
    PlayerModule,
    RoomModule,
  ],
})
export class AppModule {}
