import { PlayerDocument } from 'src/player/schemas/player.model';

export interface RoomDocument extends Document {
  occupancy: number;
  maxRounds: number;
  currentRound: number;
  players: PlayerDocument[];
  isJoin: boolean;
  turn: PlayerDocument;
  turnIndex: number;
}
