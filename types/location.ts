export type Category = 'mountain' | 'river' | 'city' | 'region';

export interface LocationMetadata {
  elevation?: string;
  length?: string;
  deity?: string;
  builtYear?: string;
  [key: string]: string | undefined;
}

export interface Location {
  id: string;
  name: {
    en: string;
    kn: string;
    hi: string;
  };
  category: Category;
  latitude: number;
  longitude: number;
  description: string;
  historicalSignificance?: string;
  metadata?: LocationMetadata;

  /** River flow path — array of [lat, lng] waypoints from source to delta */
  flowPath?: [number, number][];

  /** Mountain range direct coords — array of [lat, lng] points for proper real-world ranges */
  coords?: [number, number][];

  /** Flag to suppress automatic Knowledge Panel opening (e.g. on search for mobile) */
  noAutoOpen?: boolean;
}

export type FilterState = {
  mountain: boolean;
  river: boolean;
  city: boolean;
};
