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

  /** River flow path — array of [lat, lng] waypoints from source to delta */
  flowPath?: [number, number][];

  /** Mountain range satellite peaks — array of {lat, lng, label?} around the main summit */
  rangePoints?: { lat: number; lng: number; label?: string }[];
}

export type FilterState = {
  mountain: boolean;
  river: boolean;
  temple: boolean;
};
