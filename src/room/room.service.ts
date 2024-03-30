import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomDocument } from './schemas/room.model';
import { Model } from 'mongoose';
import { PlayerDocument } from 'src/player/schemas/player.model';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>) {}

  async createRoom(name: string, socketID: string) {
    try {
      const player: PlayerDocument = {
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
      throw new Error('fail to crete room');
    }
  }

  async joinRoom(name: string, socketID: string, roomID: string) {
    try {
      const room = await this.roomModel.findById(roomID).exec();
      if (room && room.isJoin) {
        const player: PlayerDocument = {
          name,
          playerType: 'O',
          socketID,
        };
        room.isJoin = false;
        room.players.push(player);
        const updateRoom = await this.roomModel
          .findByIdAndUpdate(roomID, room, {
            new: true,
          })
          .exec();
        return updateRoom;
      } else {
        throw new Error('your room not found');
      }
    } catch (error) {
      throw new Error('fail to join room');
    }
  }
}
