import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080)
export class SocketsGateway {
  // constructor(private readonly socketsService: SocketsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create-room')
  async createRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    // const save = await this.socketsService.createRoom(data, 'test');
    // console.log('save', save);
    console.log('client', client.id);
    console.log('data', data);
    return null;
  }
}
