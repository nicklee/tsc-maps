// Geographically accurate boundary coordinates for Europe, Mediterranean, and Slow Cyclist regions

export interface CountryPolygon {
  id: string;
  name: string;
  fillColor: string;
  strokeColor: string;
  coordinates: [number, number][][]; // Polygons with [lon, lat]
}

export interface RoadNetwork {
  id: string;
  name?: string;
  points: [number, number][]; // [lon, lat]
}

// Major European landmass contours
export const EUROPE_LANDMASSES: CountryPolygon[] = [
  // Italy (including Sicily and Sardinia)
  {
    id: 'italy',
    name: 'Italy',
    fillColor: '#8ea66e',
    strokeColor: '#627c49',
    coordinates: [
      // Main peninsula
      [
        [7.0, 44.2], [7.7, 43.8], [8.5, 44.4], [9.3, 44.3], [10.0, 44.0], [10.3, 43.5],
        [10.9, 42.8], [11.2, 42.4], [11.8, 42.0], [12.2, 41.8], [12.8, 41.3], [13.6, 41.0],
        [14.3, 40.8], [14.9, 40.1], [15.6, 39.9], [15.8, 38.3], [15.6, 38.1], [16.5, 37.9],
        [16.9, 38.4], [16.6, 39.0], [17.1, 39.7], [16.6, 40.3], [17.3, 40.4], [17.9, 40.3],
        [18.5, 39.8], [18.4, 40.4], [17.6, 40.8], [16.8, 41.1], [16.2, 41.3], [15.9, 41.9],
        [15.1, 41.9], [14.8, 42.1], [14.4, 42.3], [14.2, 42.5], [13.9, 42.9], [13.6, 43.5],
        [13.0, 43.8], [12.6, 44.0], [12.3, 44.8], [12.3, 45.4], [13.2, 45.7], [13.6, 45.6],
        [13.7, 46.5], [12.8, 46.7], [11.8, 47.0], [10.5, 46.9], [9.5, 46.5], [8.4, 46.3],
        [7.2, 45.9], [6.8, 45.2], [7.0, 44.2]
      ],
      // Sicily
      [
        [12.5, 37.9], [13.3, 38.1], [14.3, 38.0], [15.6, 38.2], [15.3, 37.5], [15.1, 36.7],
        [14.3, 37.0], [13.3, 37.3], [12.4, 37.6], [12.5, 37.9]
      ],
      // Sardinia
      [
        [8.2, 40.9], [9.3, 41.2], [9.7, 40.8], [9.7, 39.8], [9.5, 39.1], [8.9, 38.9],
        [8.4, 39.2], [8.4, 40.2], [8.2, 40.9]
      ]
    ]
  },
  // Iberian Peninsula (Spain & Portugal)
  {
    id: 'spain',
    name: 'Spain',
    fillColor: '#8ba46c',
    strokeColor: '#5c7446',
    coordinates: [
      [
        [-1.8, 43.4], [-2.7, 43.4], [-4.0, 43.5], [-5.6, 43.6], [-7.0, 43.7], [-8.0, 43.7],
        [-9.0, 43.0], [-9.0, 42.0], [-8.9, 41.5], [-8.7, 41.0], [-8.9, 39.5], [-9.5, 38.7],
        [-9.0, 37.0], [-7.4, 37.2], [-6.4, 36.7], [-5.6, 36.0], [-4.5, 36.7], [-3.0, 36.7],
        [-2.0, 36.8], [-1.0, 37.5], [-0.1, 38.7], [0.1, 40.0], [0.8, 40.8], [1.5, 41.2],
        [2.2, 41.4], [3.2, 42.0], [3.2, 42.5], [1.8, 42.4], [0.7, 42.8], [-0.5, 42.8],
        [-1.8, 43.4]
      ],
      // Balearic Islands (Mallorca, Menorca, Ibiza)
      [
        [2.4, 39.5], [3.0, 39.9], [3.4, 39.7], [3.2, 39.3], [2.4, 39.5]
      ]
    ]
  },
  // France
  {
    id: 'france',
    name: 'France',
    fillColor: '#758f58',
    strokeColor: '#546b3e',
    coordinates: [
      [
        [-1.8, 43.4], [-1.4, 44.5], [-1.2, 45.6], [-1.2, 46.2], [-2.2, 47.1], [-4.5, 48.3],
        [-4.7, 48.6], [-3.0, 48.8], [-1.5, 49.6], [0.1, 49.3], [1.3, 50.1], [1.8, 51.0],
        [2.6, 51.1], [3.5, 50.3], [5.0, 49.8], [6.2, 49.5], [7.6, 49.0], [8.0, 48.0],
        [7.5, 47.6], [6.8, 46.2], [6.8, 45.2], [7.0, 44.2], [7.5, 43.8], [6.5, 43.1],
        [5.3, 43.3], [4.3, 43.5], [3.1, 43.1], [3.1, 42.5], [1.8, 42.4], [0.7, 42.8],
        [-0.5, 42.8], [-1.8, 43.4]
      ],
      // Corsica
      [
        [8.5, 42.6], [8.7, 43.0], [9.4, 43.0], [9.5, 42.4], [9.3, 41.4], [9.1, 41.4], [8.7, 41.6], [8.6, 42.2], [8.5, 42.6]
      ]
    ]
  },
  // Greece & Aegean Islands
  {
    id: 'greece',
    name: 'Greece',
    fillColor: '#8ea66e',
    strokeColor: '#5c7446',
    coordinates: [
      // Mainland & Peloponnese
      [
        [20.0, 39.7], [20.9, 39.0], [21.4, 38.3], [21.7, 37.8], [21.6, 36.8], [22.4, 36.4],
        [22.9, 36.4], [23.1, 37.3], [23.2, 38.0], [24.0, 38.2], [23.8, 39.2], [23.0, 39.9],
        [22.6, 40.5], [23.6, 40.3], [24.2, 40.8], [25.0, 40.9], [26.0, 40.8], [26.4, 41.5],
        [25.0, 41.4], [23.5, 41.3], [22.0, 41.1], [21.0, 40.8], [20.0, 39.7]
      ],
      // Crete
      [
        [23.6, 35.3], [24.5, 35.4], [25.5, 35.3], [26.2, 35.2], [26.0, 35.0], [25.0, 35.0],
        [24.0, 35.1], [23.6, 35.3]
      ]
    ]
  },
  // United Kingdom & Ireland
  {
    id: 'uk-ireland',
    name: 'UK & Ireland',
    fillColor: '#7a965d',
    strokeColor: '#536d3c',
    coordinates: [
      // Great Britain
      [
        [-5.7, 50.0], [-5.2, 50.0], [-4.1, 50.3], [-3.3, 50.6], [-2.4, 50.5], [-1.3, 50.7],
        [0.1, 50.7], [1.4, 51.1], [1.4, 51.4], [0.8, 51.5], [1.75, 52.5], [1.2, 52.9],
        [0.3, 52.9], [0.2, 53.6], [-0.1, 54.1], [-0.6, 54.5], [-1.5, 55.0], [-1.7, 55.7],
        [-2.8, 56.0], [-2.6, 56.3], [-2.0, 57.1], [-1.8, 57.6], [-3.0, 57.7], [-3.0, 58.6],
        [-3.4, 58.7], [-5.0, 58.6], [-5.3, 58.2], [-5.7, 57.6], [-5.8, 56.9], [-5.6, 56.4],
        [-4.9, 55.7], [-4.8, 55.0], [-4.9, 54.6], [-3.6, 54.8], [-2.9, 54.1], [-3.0, 53.4],
        [-4.4, 53.3], [-4.7, 52.8], [-4.2, 52.3], [-5.3, 51.9], [-4.8, 51.6], [-4.0, 51.6],
        [-3.1, 51.5], [-2.7, 51.6], [-3.5, 51.2], [-4.5, 50.8], [-5.7, 50.0]
      ],
      // Ireland
      [
        [-6.0, 53.3], [-6.0, 54.0], [-5.5, 54.4], [-5.7, 54.7], [-6.5, 55.2], [-7.4, 55.4],
        [-8.3, 55.15], [-8.8, 54.7], [-8.4, 54.4], [-8.8, 54.2], [-10.0, 54.0], [-10.0, 53.5],
        [-9.1, 53.2], [-9.4, 52.95], [-9.9, 52.6], [-10.4, 52.1], [-9.9, 51.8], [-9.8, 51.45],
        [-8.5, 51.6], [-8.3, 51.8], [-6.9, 52.1], [-6.3, 52.2], [-6.0, 52.98], [-6.0, 53.3]
      ]
    ]
  },
  // Denmark
  {
    id: 'denmark',
    name: 'Denmark',
    fillColor: '#7e9a64',
    strokeColor: '#56713e',
    coordinates: [
      // Jutland
      [
        [8.1, 54.8], [8.3, 55.6], [8.1, 56.6], [9.8, 57.7], [10.6, 57.4], [10.2, 56.4],
        [9.8, 55.4], [9.4, 54.8], [8.1, 54.8]
      ],
      // Zealand
      [
        [11.1, 55.3], [11.8, 55.9], [12.6, 56.0], [12.5, 55.5], [12.0, 55.0], [11.2, 55.1], [11.1, 55.3]
      ]
    ]
  },
  // Scandinavia (Norway & Sweden)
  {
    id: 'scandinavia',
    name: 'Norway & Sweden',
    fillColor: '#789565',
    strokeColor: '#516f40',
    coordinates: [
      [
        [5.0, 62.0], [5.0, 60.0], [6.0, 58.5], [8.0, 58.0], [10.5, 59.0], [11.8, 57.8],
        [13.0, 55.5], [14.5, 55.5], [16.0, 56.5], [18.0, 59.0], [19.0, 61.0], [21.0, 63.5],
        [24.0, 65.5], [21.0, 68.5], [28.0, 70.5], [30.0, 70.0], [25.0, 71.0], [20.0, 70.0],
        [16.0, 69.0], [13.0, 68.0], [12.0, 66.0], [9.0, 63.0], [5.0, 62.0]
      ]
    ]
  },
  // Central & Eastern Europe (Germany, Low Countries, Switzerland, Austria, Poland, Romania, Balkans)
  {
    id: 'central-europe',
    name: 'Central & Eastern Europe',
    fillColor: '#829c62',
    strokeColor: '#59733d',
    coordinates: [
      [
        [7.6, 49.0], [6.2, 49.5], [5.0, 49.8], [3.5, 50.3], [2.6, 51.1], [3.6, 51.4], [4.0, 51.8],
        [4.8, 52.5], [5.2, 53.0], [7.0, 53.6], [8.1, 53.8], [8.5, 54.0], [9.4, 54.8], [10.0, 54.5],
        [11.0, 54.0], [12.0, 54.3], [14.0, 54.0], [17.5, 54.7], [19.0, 54.5], [21.0, 55.0],
        [23.0, 54.0], [24.0, 52.0], [24.0, 49.0], [26.0, 48.0], [28.5, 47.0], [29.5, 46.0],
        [29.0, 45.0], [28.5, 44.0], [27.8, 43.5], [28.0, 42.0], [26.4, 41.5], [25.0, 41.4],
        [23.5, 41.3], [22.0, 41.1], [21.0, 40.8], [20.0, 41.5], [19.4, 42.0], [18.2, 42.5],
        [17.0, 43.2], [16.0, 43.8], [15.2, 44.3], [14.2, 45.2], [13.7, 45.8], [13.7, 46.5],
        [12.8, 46.7], [11.8, 47.0], [10.5, 46.9], [9.5, 46.5], [8.4, 46.3], [7.6, 49.0]
      ]
    ]
  },
  // Anatolia / Turkey
  {
    id: 'turkey',
    name: 'Turkey',
    fillColor: '#7a965d',
    strokeColor: '#55723b',
    coordinates: [
      [
        [26.0, 40.8], [27.0, 41.5], [29.0, 41.2], [31.5, 41.5], [35.0, 42.0], [38.0, 41.0],
        [41.5, 41.5], [43.5, 41.0], [44.0, 39.5], [43.0, 37.5], [36.0, 36.0], [33.0, 36.0],
        [30.0, 36.5], [27.5, 37.0], [26.5, 38.5], [26.0, 40.8]
      ]
    ]
  },
  // Caucasus (Armenia & Georgia)
  {
    id: 'armenia-georgia',
    name: 'Armenia & Georgia',
    fillColor: '#8ea66e',
    strokeColor: '#5e7943',
    coordinates: [
      [
        [40.0, 43.5], [42.0, 43.0], [45.0, 42.5], [47.5, 41.8], [46.5, 40.5], [46.0, 39.0],
        [44.5, 39.0], [43.5, 40.0], [42.0, 41.5], [41.5, 42.5], [40.0, 43.5]
      ]
    ]
  },
  // North Africa edge for realistic Mediterranean basin
  {
    id: 'north-africa',
    name: 'North Africa',
    fillColor: '#748d53',
    strokeColor: '#566e3b',
    coordinates: [
      [
        [-9.5, 32.0], [-5.0, 35.5], [-2.0, 35.2], [1.0, 36.0], [4.0, 37.0], [8.0, 37.2],
        [10.5, 37.0], [11.0, 36.0], [11.5, 33.5], [15.0, 32.0], [20.0, 32.0], [25.0, 31.5],
        [30.0, 31.0], [30.0, 30.0], [-9.5, 30.0], [-9.5, 32.0]
      ]
    ]
  }
];

// Highlighted Region Polygons (Zoom level 1 & 2)
export const ABRUZZO_REGION_POLYGON: [number, number][] = [
  [13.1, 42.4],
  [13.2, 42.6],
  [13.4, 42.8],
  [13.7, 42.9],
  [13.9, 42.9],
  [14.2, 42.7],
  [14.4, 42.4],
  [14.6, 42.2],
  [14.7, 42.0],
  [14.5, 41.8],
  [14.2, 41.7],
  [13.9, 41.7],
  [13.6, 41.8],
  [13.4, 42.0],
  [13.1, 42.4]
];

// Slow Cyclist Curated Road & Trail Network (ivory lines connecting key places)
export const CURATED_ROADS: RoadNetwork[] = [
  // Italy spine (Rome to Adriatic through Abruzzo)
  {
    id: 'it-via-salaria',
    points: [[12.5, 41.9], [12.9, 42.1], [13.2, 42.3], [13.4, 42.35], [13.67, 42.44], [13.85, 42.45], [14.2, 42.46]]
  },
  // Abruzzo scenic mountain loop (Gran Sasso to Majella)
  {
    id: 'abruzzo-gran-sasso-loop',
    points: [
      [13.4, 42.35], [13.55, 42.45], [13.67, 42.44], [13.72, 42.36], [13.69, 42.33],
      [13.67, 42.34], [13.62, 42.28], [13.66, 42.24], [13.82, 42.21], [13.87, 42.10],
      [14.00, 42.15], [14.07, 42.18], [14.22, 42.19], [14.4, 42.35]
    ]
  },
  // Tuscany ridge road
  {
    id: 'tuscany-ridge',
    points: [[11.2, 43.7], [11.35, 43.45], [11.48, 43.05], [11.67, 43.07], [11.78, 43.09], [11.9, 42.8]]
  },
  // Puglia coastal lane
  {
    id: 'puglia-lane',
    points: [[16.85, 41.1], [17.3, 40.95], [17.32, 40.75], [17.58, 40.73], [17.9, 40.6], [18.4, 40.4]]
  },
  // Spain - Basque & Rioja pilgrimage trail
  {
    id: 'spain-camino-rioja',
    points: [[-3.7, 40.4], [-3.1, 41.5], [-2.44, 42.46], [-2.71, 42.57], [-2.67, 42.84], [-2.59, 43.12], [-1.98, 43.32]]
  },
  // Greece - Peloponnese mountain route
  {
    id: 'greece-peloponnese',
    points: [[23.7, 38.0], [22.9, 37.9], [22.8, 37.56], [22.43, 37.07], [22.23, 36.88], [22.38, 36.66]]
  },
  // Armenia - Silk Road canyon trail
  {
    id: 'armenia-trail',
    points: [[44.5, 40.2], [43.84, 40.79], [44.38, 41.00], [44.64, 40.99], [44.75, 40.94], [45.01, 40.56]]
  },
  // Norway - Arctic coastal route
  {
    id: 'norway-arctic-trail',
    points: [[14.4, 67.3], [15.41, 68.69], [15.02, 68.99], [16.12, 69.31]]
  }
];

// Major Seas / Water body labels
export const SEA_LABELS = [
  { name: 'ADRIATIC SEA', coords: [15.5, 42.6] as [number, number], minZoom: 2.0 },
  { name: 'TYRRHENIAN SEA', coords: [11.8, 40.2] as [number, number], minZoom: 2.0 },
  { name: 'MEDITERRANEAN SEA', coords: [16.0, 35.8] as [number, number], maxZoom: 3.8 },
  { name: 'IONIAN SEA', coords: [19.0, 37.8] as [number, number], minZoom: 2.2 },
  { name: 'AEGEAN SEA', coords: [25.2, 38.0] as [number, number], minZoom: 2.4 },
  { name: 'BAY OF BISCAY', coords: [-4.0, 44.8] as [number, number], minZoom: 1.8 },
  { name: 'NORTH SEA', coords: [3.0, 56.0] as [number, number], minZoom: 1.8 },
  { name: 'NORWEGIAN SEA', coords: [8.0, 66.0] as [number, number], minZoom: 1.8 },
  { name: 'BLACK SEA', coords: [32.0, 43.5] as [number, number], minZoom: 1.8 },
  { name: 'LIGURIAN SEA', coords: [9.0, 43.5] as [number, number], minZoom: 3.0 },
];

// Major Rivers rendered as gentle watercolor ribbons
export interface RiverPath {
  id: string;
  name: string;
  points: [number, number][];
  minZoom?: number;
}

export const EUROPE_RIVERS: RiverPath[] = [
  // Po River (Italy's great northern arterial river)
  {
    id: 'river-po',
    name: 'Po River',
    points: [
      [7.1, 44.7], [7.7, 45.0], [8.5, 45.1], [9.3, 45.0], [10.0, 45.0],
      [10.7, 45.0], [11.4, 44.9], [12.0, 44.9], [12.5, 44.95]
    ],
    minZoom: 2.2
  },
  // Tiber River (Through Umbria & Rome into Tyrrhenian Sea)
  {
    id: 'river-tiber',
    name: 'Tiber',
    points: [
      [12.1, 43.8], [12.3, 43.4], [12.4, 42.8], [12.45, 42.3],
      [12.5, 41.9], [12.25, 41.75]
    ],
    minZoom: 2.8
  },
  // Arno River (Florence, Tuscany)
  {
    id: 'river-arno',
    name: 'Arno',
    points: [
      [11.75, 43.85], [11.5, 43.78], [11.25, 43.77], [10.8, 43.72], [10.3, 43.68]
    ],
    minZoom: 3.2
  },
  // Aterno-Pescara River (Central spine of Abruzzo)
  {
    id: 'river-pescara-aterno',
    name: 'Aterno-Pescara',
    points: [
      [13.25, 42.45], [13.39, 42.35], [13.6, 42.25], [13.83, 42.17],
      [14.05, 42.32], [14.22, 42.46]
    ],
    minZoom: 4.5
  },
  // Danube River (Across Central Europe into Black Sea)
  {
    id: 'river-danube',
    name: 'Danube',
    points: [
      [9.5, 48.2], [12.0, 48.8], [14.0, 48.3], [17.1, 48.1], [19.0, 47.5],
      [19.0, 46.2], [20.5, 44.8], [22.2, 44.6], [24.5, 43.7], [27.0, 44.2],
      [28.2, 45.2], [29.6, 45.3]
    ],
    minZoom: 1.6
  },
  // Douro River (Spain & Portugal wine country)
  {
    id: 'river-douro',
    name: 'Douro',
    points: [
      [-2.8, 41.8], [-4.0, 41.6], [-5.5, 41.4], [-6.5, 41.4],
      [-7.5, 41.15], [-8.6, 41.14]
    ],
    minZoom: 2.0
  },
  // Tagus (Tejo) River (Through Spain to Lisbon)
  {
    id: 'river-tagus',
    name: 'Tagus',
    points: [
      [-1.8, 40.4], [-3.7, 39.9], [-5.5, 39.8], [-7.5, 39.5], [-9.1, 38.7]
    ],
    minZoom: 2.0
  },
  // Rhone River (Alps to Mediterranean)
  {
    id: 'river-rhone',
    name: 'Rhone',
    points: [
      [8.0, 46.5], [6.8, 46.2], [4.8, 45.7], [4.8, 44.8], [4.7, 43.7], [4.8, 43.3]
    ],
    minZoom: 2.0
  }
];

// Mountain Ranges with individual peaks and ridges for hand-illustrated relief
export interface MountainPeak {
  coords: [number, number];
  name?: string;
  height?: number;
  size?: 'large' | 'medium' | 'small';
}

export interface MountainRange {
  id: string;
  name: string;
  labelCoords: [number, number];
  peaks: MountainPeak[];
  minZoom?: number;
  maxZoom?: number;
}

export const MOUNTAIN_RANGES: MountainRange[] = [
  // The European Alps (Sweeping arch across Northern Italy)
  {
    id: 'range-alps',
    name: 'THE ALPS',
    labelCoords: [10.2, 46.5],
    minZoom: 1.0,
    peaks: [
      { coords: [6.8, 45.8], name: 'Mont Blanc', height: 4808, size: 'large' },
      { coords: [7.7, 45.9], name: 'Matterhorn', height: 4478, size: 'large' },
      { coords: [8.5, 46.3], size: 'medium' },
      { coords: [9.8, 46.5], name: 'Piz Bernina', size: 'large' },
      { coords: [10.8, 46.5], size: 'medium' },
      { coords: [11.8, 46.5], name: 'Dolomites', size: 'large' },
      { coords: [12.4, 46.4], size: 'large' },
      { coords: [13.2, 46.5], size: 'medium' },
      { coords: [7.0, 45.2], size: 'small' },
      { coords: [8.0, 45.5], size: 'small' },
      { coords: [11.2, 46.2], size: 'small' },
      { coords: [12.8, 46.2], size: 'small' },
    ]
  },
  // The Apennines (Italy's central spine with prominent Abruzzo summits)
  {
    id: 'range-apennines',
    name: 'THE APENNINES',
    labelCoords: [12.5, 43.5],
    minZoom: 2.0,
    peaks: [
      { coords: [10.5, 44.3], name: 'Monte Cimone', size: 'medium' },
      { coords: [11.6, 44.0], size: 'small' },
      { coords: [12.6, 43.4], size: 'medium' },
      { coords: [13.2, 42.8], name: 'Monti Sibillini', size: 'medium' },
      // Gran Sasso & Majella in Abruzzo (Heart of Slow Cyclist Italy!)
      { coords: [13.56, 42.47], name: 'Corno Grande', height: 2912, size: 'large' },
      { coords: [13.68, 42.42], name: 'Gran Sasso', size: 'large' },
      { coords: [13.75, 42.35], name: 'Monte Camicia', size: 'medium' },
      { coords: [14.08, 42.08], name: 'Majella Massif', height: 2793, size: 'large' },
      { coords: [13.88, 41.98], name: 'Monte Amaro', size: 'medium' },
      { coords: [13.72, 41.86], name: 'Monti Marsicani', size: 'medium' },
      { coords: [15.2, 40.6], size: 'small' },
      { coords: [16.1, 39.8], size: 'small' },
    ]
  },
  // Pyrenees (Bordering Spain & France)
  {
    id: 'range-pyrenees',
    name: 'PYRENEES',
    labelCoords: [0.5, 42.8],
    minZoom: 1.4,
    peaks: [
      { coords: [-0.8, 43.0], size: 'medium' },
      { coords: [0.3, 42.7], name: 'Pico Aneto', size: 'large' },
      { coords: [1.2, 42.6], size: 'large' },
      { coords: [2.1, 42.5], size: 'medium' },
    ]
  },
  // Carpathians (Romania - Transylvania wilderness)
  {
    id: 'range-carpathians',
    name: 'CARPATHIAN MOUNTAINS',
    labelCoords: [25.0, 46.2],
    minZoom: 1.5,
    peaks: [
      { coords: [24.0, 47.3], size: 'medium' },
      { coords: [25.3, 46.8], size: 'medium' },
      { coords: [25.6, 45.6], name: 'Bucegi', size: 'large' },
      { coords: [24.7, 45.6], name: 'Fagaras', size: 'large' },
      { coords: [23.2, 45.3], size: 'medium' },
    ]
  },
  // Pindus Mountains (Greece)
  {
    id: 'range-pindus',
    name: 'PINDUS MOUNTAINS',
    labelCoords: [21.5, 39.6],
    minZoom: 2.2,
    peaks: [
      { coords: [21.1, 40.0], size: 'medium' },
      { coords: [21.3, 39.7], size: 'medium' },
      { coords: [22.3, 40.1], name: 'Mount Olympus', size: 'large' },
      { coords: [22.3, 37.0], name: 'Taygetos', size: 'medium' }
    ]
  },
  // Caucasus & Mount Ararat (Armenia)
  {
    id: 'range-caucasus',
    name: 'CAUCASUS',
    labelCoords: [44.5, 41.2],
    minZoom: 1.8,
    peaks: [
      { coords: [44.3, 39.7], name: 'Mount Ararat', height: 5137, size: 'large' },
      { coords: [44.2, 40.5], name: 'Mount Aragats', size: 'large' },
      { coords: [45.2, 40.3], size: 'medium' },
    ]
  }
];

// Direct Geographic Country & Regional Labels printed on the map canvas
export interface MapCanvasLabel {
  id: string;
  name: string;
  coords: [number, number];
  type: 'country' | 'region' | 'feature';
  minZoom: number;
  maxZoom?: number;
  tracking?: string;
}

export const MAP_CANVAS_LABELS: MapCanvasLabel[] = [
  // Major Destination Countries
  { id: 'lbl-italy', name: 'ITALY', coords: [12.6, 43.1], type: 'country', minZoom: 0.8, maxZoom: 3.5 },
  { id: 'lbl-spain', name: 'SPAIN', coords: [-3.8, 40.0], type: 'country', minZoom: 0.8, maxZoom: 3.5 },
  { id: 'lbl-greece', name: 'GREECE', coords: [22.6, 38.8], type: 'country', minZoom: 0.8, maxZoom: 3.5 },
  { id: 'lbl-romania', name: 'ROMANIA', coords: [25.0, 45.8], type: 'country', minZoom: 0.8, maxZoom: 3.5 },
  { id: 'lbl-armenia', name: 'ARMENIA', coords: [44.8, 40.2], type: 'country', minZoom: 1.0, maxZoom: 3.8 },
  { id: 'lbl-portugal', name: 'PORTUGAL', coords: [-8.4, 39.8], type: 'country', minZoom: 1.2, maxZoom: 3.8 },
  { id: 'lbl-france', name: 'FRANCE', coords: [2.5, 46.8], type: 'country', minZoom: 0.8, maxZoom: 3.5 },
  { id: 'lbl-croatia', name: 'CROATIA', coords: [16.2, 44.6], type: 'country', minZoom: 1.4, maxZoom: 3.8 },
  { id: 'lbl-norway', name: 'NORWAY', coords: [9.0, 61.2], type: 'country', minZoom: 0.8, maxZoom: 3.5 },

  // Italian Slow Cyclist Regions (Revealed at Zoom >= 2.0)
  { id: 'lbl-tuscany', name: 'TUSCANY', coords: [11.3, 43.4], type: 'region', minZoom: 2.2 },
  { id: 'lbl-abruzzo', name: 'ABRUZZO', coords: [13.7, 42.25], type: 'region', minZoom: 2.2 },
  { id: 'lbl-puglia', name: 'PUGLIA', coords: [16.8, 41.0], type: 'region', minZoom: 2.2 },
  { id: 'lbl-piedmont', name: 'PIEDMONT', coords: [8.0, 44.8], type: 'region', minZoom: 2.4 },
  { id: 'lbl-sicily', name: 'SICILY', coords: [14.0, 37.6], type: 'region', minZoom: 2.0 },
  { id: 'lbl-sardinia', name: 'SARDINIA', coords: [9.0, 40.0], type: 'region', minZoom: 2.0 },

  // Spanish, Greek & Romanian Regions
  { id: 'lbl-rioja', name: 'LA RIOJA', coords: [-2.6, 42.3], type: 'region', minZoom: 2.5 },
  { id: 'lbl-andalucia', name: 'ANDALUCÍA', coords: [-4.5, 37.5], type: 'region', minZoom: 2.2 },
  { id: 'lbl-peloponnese', name: 'PELOPONNESE', coords: [22.3, 37.5], type: 'region', minZoom: 2.4 },
  { id: 'lbl-crete', name: 'CRETE', coords: [24.8, 35.2], type: 'region', minZoom: 2.2 },
  { id: 'lbl-transylvania', name: 'TRANSYLVANIA', coords: [24.5, 46.4], type: 'region', minZoom: 2.2 },
  { id: 'lbl-douro', name: 'DOURO VALLEY', coords: [-7.5, 41.2], type: 'region', minZoom: 2.6 },

  // Abruzzo Specific Sub-Features (Revealed at Zoom >= 4.5)
  { id: 'lbl-campo-imperatore', name: 'CAMPO IMPERATORE', coords: [13.68, 42.42], type: 'feature', minZoom: 4.8 },
  { id: 'lbl-gran-sasso', name: 'GRAN SASSO D’ITALIA', coords: [13.56, 42.48], type: 'feature', minZoom: 4.5 },
  { id: 'lbl-majella', name: 'MAJELLA NATIONAL PARK', coords: [14.08, 42.06], type: 'feature', minZoom: 4.5 },
  { id: 'lbl-tirino', name: 'VALLE DEL TIRINO', coords: [13.84, 42.26], type: 'feature', minZoom: 5.2 },
  { id: 'lbl-sagittario', name: 'GOLE DEL SAGITTARIO', coords: [13.88, 41.98], type: 'feature', minZoom: 5.5 }
];

// Sparse decorative illustrated elements inspired directly by Slow Cyclist maps
export interface IllustratedLandmark {
  id: string;
  type: 'mountain' | 'cypress' | 'pine' | 'sheep' | 'wine' | 'bike' | 'castle' | 'boat' | 'church' | 'lemon' | 'compass';
  coords: [number, number];
  label?: string;
  minZoom: number;
  maxZoom?: number;
  scale?: number;
}

export const ILLUSTRATED_LANDMARKS: IllustratedLandmark[] = [
  // Europe level landmarks (Sparse visual punctuation)
  { id: 'elm-boat-med', type: 'boat', coords: [12.0, 39.0], label: 'Mediterranean Barque', minZoom: 0.8, maxZoom: 3.2, scale: 1.1 },
  { id: 'elm-boat-aegean', type: 'boat', coords: [25.8, 36.8], minZoom: 1.2, maxZoom: 3.5, scale: 0.9 },
  { id: 'elm-boat-adriatic', type: 'boat', coords: [15.2, 42.0], minZoom: 1.8, maxZoom: 4.0, scale: 0.85 },
  { id: 'elm-compass-atlantic', type: 'compass', coords: [-7.0, 47.0], minZoom: 0.8, maxZoom: 3.0, scale: 1.3 },
  
  // Agricultural & Cultural Vignettes
  { id: 'elm-wine-tuscany', type: 'wine', coords: [11.0, 43.1], label: 'Chianti Vineyards', minZoom: 1.8, maxZoom: 4.5, scale: 1.0 },
  { id: 'elm-wine-douro', type: 'wine', coords: [-7.8, 41.3], minZoom: 1.8, maxZoom: 4.2, scale: 0.9 },
  { id: 'elm-wine-rioja', type: 'wine', coords: [-2.8, 42.5], minZoom: 1.8, maxZoom: 4.2, scale: 0.9 },
  { id: 'elm-cypress-tuscany-1', type: 'cypress', coords: [11.4, 43.3], minZoom: 1.8, maxZoom: 5.5, scale: 1.1 },
  { id: 'elm-cypress-tuscany-2', type: 'cypress', coords: [11.7, 43.0], minZoom: 2.2, maxZoom: 5.5, scale: 0.9 },
  { id: 'elm-lemon-puglia', type: 'lemon', coords: [17.5, 40.8], minZoom: 2.0, maxZoom: 4.8, scale: 1.0 },
  { id: 'elm-lemon-greece', type: 'lemon', coords: [22.8, 37.2], minZoom: 2.0, maxZoom: 4.8, scale: 1.0 },
  { id: 'elm-church-greece', type: 'church', coords: [23.4, 37.8], minZoom: 2.2, maxZoom: 4.8, scale: 1.0 },

  // Pastoral & Alpine Vignettes
  { id: 'elm-sheep-romania', type: 'sheep', coords: [24.4, 46.8], label: 'Transylvanian Pastures', minZoom: 1.5, maxZoom: 4.5, scale: 1.0 },
  { id: 'elm-sheep-abruzzo', type: 'sheep', coords: [13.78, 42.39], label: 'Campo Imperatore Flocks', minZoom: 4.2, maxZoom: 9.0, scale: 1.1 },
  { id: 'elm-pine-rome', type: 'pine', coords: [12.2, 41.8], minZoom: 2.2, maxZoom: 5.0, scale: 1.0 },
  { id: 'elm-pine-abruzzo', type: 'pine', coords: [14.1, 42.3], minZoom: 4.5, maxZoom: 9.0, scale: 1.0 },

  // Abruzzo Specific Illustrated Architecture & Lore (Zoom >= 4.0)
  { id: 'elm-castle-calascio', type: 'castle', coords: [13.69, 42.33], label: 'Rocca Calascio', minZoom: 4.5, maxZoom: 9.0, scale: 1.25 },
  { id: 'elm-church-stefano', type: 'church', coords: [13.65, 42.38], label: 'Santo Stefano', minZoom: 5.2, maxZoom: 9.0, scale: 1.0 },
  { id: 'elm-bike-abruzzo-trail', type: 'bike', coords: [13.75, 42.31], label: 'Slow Cyclist Gravel Pass', minZoom: 5.0, maxZoom: 9.0, scale: 1.15 },
];

