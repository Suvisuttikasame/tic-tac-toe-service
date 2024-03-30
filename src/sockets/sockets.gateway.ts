import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketsService } from './sockets.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoom } from './dto/join-room.dto';

@WebSocketGateway(8080)
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketsService: SocketsService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`create connection socket: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`remove connection socket: ${client.id}`);
  }

  @SubscribeMessage('create-room')
  async createRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateRoomDto,
  ) {
    try {
      const req = data.data;
      const room = await this.socketsService.createRoom(req.name, client.id);
      const roomId = room._id.toString();
      client.join(roomId);

      this.server.to(roomId).emit('create-room-success', room);
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('join-room')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinRoom,
  ) {
    try {
      const req = data.data;
      const room = await this.socketsService.joinRoom(
        req.name,
        client.id,
        req.roomId,
      );
      const roomId = room._id.toString();
      client.join(roomId);

      this.server.to(roomId).emit('join-room-success', room);
    } catch (error) {
      console.log(error);
    }
  }
}
