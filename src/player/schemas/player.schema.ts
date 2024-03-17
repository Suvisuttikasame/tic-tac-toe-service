import { Schema } from 'mongoose';

export const playerSchema = new Schema({
  name: { require: true, type: String, trim: true },
  socketID: { require: true, type: String },
  points: { type: Number, default: 0 },
  playerType: { require: true, type: String },
});
