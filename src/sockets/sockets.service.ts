import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { RoomDocument } from 'src/room/schemas/room.model';

@Injectable()
export class SocketsService {
  constructor(private roomService: RoomService) {}

  async createRoom(name: string, socketID: string) {
    return await this.roomService.createRoom(name, socketID);
  }

  async updateRoom(room: RoomDocument, id: string) {
    return await this.roomService.updateRoom(room, id);
  }

  async joinRoom(name: string, socketID: string, roomID: string) {
    return await this.roomService.joinRoom(name, socketID, roomID);
  }

  async getRoomById(roomId: string) {
    return await this.roomService.getRoomById(roomId);
  }
}
