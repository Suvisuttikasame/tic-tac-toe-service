import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketsService } from './sockets.service';

@WebSocketGateway(8080)
export class SocketsGateway {
  constructor(private readonly socketsService: SocketsService) {}

  @SubscribeMessage('create-room')
  createRoom(@MessageBody() data: string) {
    console.log('getdata', data);
    return null;
  }
}
