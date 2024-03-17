import { Model, model } from 'mongoose';
import { PlayerDocument } from 'src/player/schemas/player.model';
import { roomSchema } from './room.schema';

export interface RoomDocument extends Document {
  occupancy: number;
  maxRounds: number;
  currentRound: number;
  players: PlayerDocument[];
  isJoin: boolean;
  turn: PlayerDocument;
  turnIndex: number;
}

export const roomModel: Model<RoomDocument> = model<RoomDocument>(
  'Room',
  roomSchema,
);
