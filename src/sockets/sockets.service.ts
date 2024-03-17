import { Injectable } from '@nestjs/common';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class SocketsService {
  constructor(private roomService: RoomService) {}
  async createRoom(name: string, socketID: string) {
    return await this.roomService.createRoom(name, socketID);
  }
}
