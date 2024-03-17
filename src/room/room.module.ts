import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { roomSchema } from './schemas/room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: roomSchema }])],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
