
export interface PoemData {
  name: string;
  trait: string;
  generatedPoem?: string;
}

export interface CardData {
  style: string;
  message: string;
  imageUrl?: string;
}

export enum AppSection {
  PROPOSAL = 'PROPOSAL',
  POEM = 'POEM',
  CARD = 'CARD'
}
