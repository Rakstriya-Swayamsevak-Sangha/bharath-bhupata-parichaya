export type Category = 'mountain' | 'river' | 'temple';

export interface LocationMetadata {
  elevation?: string;
  length?: string;
  deity?: string;
  builtYear?: string;
  [key: string]: string | undefined;
}

export interface Location {
  id: string;
  name: string;
  nameHindi?: string;
  category: Category;
  latitude: number;
  longitude: number;
  description: string;
  historicalSignificance?: string;
  metadata?: LocationMetadata;
}

export type FilterState = {
  mountain: boolean;
  river: boolean;
  temple: boolean;
};
