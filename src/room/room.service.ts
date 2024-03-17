import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomDocument } from './schemas/room.model';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>) {}

  async createRoom(name: string, socketID: string) {
    try {
      const player = {
        name,
        playerType: 'X',
        socketID,
      };
      const room = {
        players: [player],
        turn: player,
      };
      const model = await new this.roomModel(room);
      const createRoom = await model.save();
      return createRoom;
    } catch (error) {
      throw Error('fail to crete room');
    }
  }
}
