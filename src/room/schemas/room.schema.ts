import { Schema } from 'mongoose';
import { playerSchema } from 'src/player/schemas/player.schema';

export const roomSchema = new Schema({
  occupancy: { type: Number, default: 2 },
  maxRounds: { type: Number, default: 6 },
  currentRound: { require: true, type: Number, default: 1 },
  players: [playerSchema],
  isJoin: { type: Boolean, default: true },
  turn: playerSchema,
  turnIndex: { type: Number, default: 0 },
});
