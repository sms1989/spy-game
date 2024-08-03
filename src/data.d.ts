import { Category } from "./pages";

export interface Data {
  players: number;
  spiesLocation: number[];
  timer: number;
  expiredAt?: string;
  word: Word;
  currentPlayer: number;
  hasHint: boolean;
  category?: Category;
}

export interface Word {
  word: string;
  hint: string[];
}
