import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketsService } from './sockets.service';
import { CreateRoomDto } from './dto/create-room.dto';

@WebSocketGateway(8080)
export class SocketsGateway {
  constructor(private readonly socketsService: SocketsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create-room')
  async createRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateRoomDto,
  ) {
    try {
      const room = await this.socketsService.createRoom(data.data, client.id);
      const roomId = room._id.toString();
      client.join(roomId);

      this.server.to(roomId).emit('create-room-success', room);
    } catch (error) {
      console.log(error);
    }
  }
}
