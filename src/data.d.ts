export interface Data {
  players: number;
  spiesLocation: number[];
  timer: number;
  expiredAt: Date;
  word: Word;
  currentPlayer: number;
}

export interface Word {
  word: string;
  hint: string[];
}
