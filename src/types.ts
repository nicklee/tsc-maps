export interface Waypoint {
  name: string;
  coords: [number, number]; // [lon, lat]
  isOvernight?: boolean; // Red dot!
  nights?: number;
  highlight?: string;
  type?: 'town' | 'castle' | 'pass' | 'monastery' | 'overnight';
}

export interface IllustratedVignette {
  id: string;
  name: string;
  coords: [number, number]; // [lon, lat]
  type: 'mountain' | 'castle' | 'wine' | 'cypress' | 'pine' | 'sheep' | 'boar' | 'flower' | 'bike' | 'monastery' | 'cabin';
  minZoom?: number;
  rotation?: number;
}

export interface Journey {
  id: string;
  title: string;
  countryId: string;
  countryName: string;
  regionId: string;
  regionName: string;
  category: 'Classic' | 'Signature' | 'Explorer';
  activityLevel: number; // 1 to 5
  durationNights: number;
  dates: string;
  priceFrom: number;
  currency: string;
  mode: 'Cycling & Walking' | 'Cycling' | 'Walking';
  heroImage: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  waypoints: Waypoint[];
  routeCoordinates: [number, number][]; // [lon, lat] sequence
  vignettes?: IllustratedVignette[];
  isSoldOut?: boolean;
  featured?: boolean;
}

export interface Region {
  id: string;
  countryId: string;
  name: string;
  coords: [number, number]; // [lon, lat]
  journeyCount: number;
  zoomLevel: number;
  summary: string;
  thumbnail?: string;
}

export interface DestinationCountry {
  id: string;
  name: string;
  coords: [number, number]; // [lon, lat]
  journeyCount: number;
  zoomLevel: number;
  regions: Region[];
  thumbnail?: string;
}

export interface FilterState {
  countryId: string | null;
  regionId: string | null;
  season: string;
  activityLevel: number | null;
  searchQuery: string;
}
