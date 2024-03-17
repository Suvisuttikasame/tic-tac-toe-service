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
  async createRoom(@MessageBody() data: string) {
    const save = await this.socketsService.createRoom(data, 'test');
    console.log('save', save);
    return null;
  }
}
