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
import { OnTap } from './dto/on-tab.dto';
import { UpdateWinner } from './dto/update-winner.dto';

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
      client.emit('error-occur', error.message);
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
      this.server.to(roomId).emit('update-player', room.players);
      //update room for player who is waiting in a lobby
      this.server.to(roomId).emit('update-room', room);
    } catch (error) {
      client.emit('error-occur', error.message);
    }
  }

  @SubscribeMessage('on-tap')
  async onTap(@ConnectedSocket() client: Socket, @MessageBody() data: OnTap) {
    try {
      const req = data.data;
      const room = await this.socketsService.getRoomById(req.roomId);

      room.currentRound += 1;
      const type = room.turn.playerType;

      if (room.turnIndex == 0) {
        room.turn = room.players[1];
        room.turnIndex = 1;
      } else {
        room.turn = room.players[0];
        room.turnIndex = 0;
      }

      const sr = await this.socketsService.updateRoom(
        room,
        room._id.toString(),
      );
      this.server.emit('update-on-tap', {
        room: sr,
        dashBoard: req.dashBoard,
      });
    } catch (error) {
      client.emit('error-occur', error.message);
    }
  }

  @SubscribeMessage('winner')
  async winner(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UpdateWinner,
  ) {
    //find room
    try {
      const req = data.data;
      const room = await this.socketsService.getRoomById(req.roomId);
      room.currentRound += 1;
      if (room.currentRound == 6) {
        // end game
      }
      const updatePlayers = room.players.map((player) => {
        if (player.socketID == req.winnerId) {
          player.points += 1;
        }
        return player;
      });
      room.players = updatePlayers;

      const ur = await this.socketsService.updateRoom(
        room,
        room._id.toString(),
      );

      this.server.to(room._id.toString()).emit('update-room', ur);
      this.server.to(room._id.toString()).emit('update-player', ur.players);
    } catch (error) {
      client.emit('error-occur', error.message);
    }
  }
}
