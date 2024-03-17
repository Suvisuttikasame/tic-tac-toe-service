import { Model, model } from 'mongoose';
import { playerSchema } from './player.schema';

export interface PlayerDocument extends Document {
  name: string;
  socketID: string;
  points: number;
  playerType: string;
}

export const playerModel: Model<PlayerDocument> = model<PlayerDocument>(
  'Player',
  playerSchema,
);
