export interface PlayerDocument extends Document {
  name: string;
  socketID: string;
  points: number;
  playerType: string;
}
