import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';

@Injectable()
export class SocketsService {
  constructor(private roomService: RoomService) {}

  async createRoom(name: string, socketID: string) {
    return await this.roomService.createRoom(name, socketID);
  }

  async joinRoom(name: string, socketID: string, roomID: string) {
    return await this.roomService.joinRoom(name, socketID, roomID);
  }
}
