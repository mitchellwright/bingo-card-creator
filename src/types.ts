export interface BingoCard {
  squares: string[];
  freeSpaceImage?: string;
  themeColor: string;
}

export interface BingoFormData {
  words: string[];
  numberOfCards: number;
  freeSpaceImage?: File;
}