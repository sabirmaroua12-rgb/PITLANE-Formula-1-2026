export type RaceStatus = 'completed' | 'upcoming' | 'live' | 'locked'
export type RaceType = 'standard' | 'sprint'
export type Continent = 'middle-east' | 'europe' | 'americas' | 'asia' | 'oceania'

export interface Race {
  id: string
  slug: string
  round: number
  name: string
  city: string
  country: string
  circuit: string
  continent: Continent
  type: RaceType
  status: RaceStatus
  dateRange: string
  date: string         // ISO
  laps: number
  distance: number     // km
  lapRecord: string
  lapRecordHolder: string
  lapRecordYear: number
  topSpeed: number     // km/h
  elevation: number    // m
  drsZones: number
  corners: number
  winner?: string
  polePosition?: string
  fastestLap?: string
  weather: { ambient: number; track: number; humidity: number; wind: number }
  circuitPath: string  // SVG path
  isSprint: boolean
  engineMode: string
  tyreStrategy: string
}

export const races: Race[] = [
  {
    id: 'bahrain-2026', slug: 'sakhir', round: 1,
    name: 'Bahrain Grand Prix', city: 'Sakhir', country: 'Bahrain',
    circuit: 'Bahrain International Circuit',
    continent: 'middle-east', type: 'standard', status: 'completed',
    dateRange: 'MAR 02', date: '2026-03-02',
    laps: 57, distance: 308.238, lapRecord: '1:31.447', lapRecordHolder: 'P. De La Rosa', lapRecordYear: 2005,
    topSpeed: 310, elevation: 3, drsZones: 3, corners: 15,
    winner: 'Max Verstappen', polePosition: 'Max Verstappen', fastestLap: 'L. Hamilton',
    weather: { ambient: 32, track: 48, humidity: 14, wind: 12 },
    circuitPath: 'M 50 80 L 60 70 L 80 65 L 90 50 L 85 35 L 75 30 L 65 35 L 60 50 L 55 60 L 45 65 L 40 70 L 50 80 Z',
    isSprint: false, engineMode: 'POWER', tyreStrategy: 'MEDIUM → HARD',
  },
  {
    id: 'jeddah-2026', slug: 'jeddah', round: 2,
    name: 'Saudi Arabian Grand Prix', city: 'Jeddah', country: 'Saudi Arabia',
    circuit: 'Jeddah Corniche Circuit',
    continent: 'middle-east', type: 'standard', status: 'completed',
    dateRange: 'MAR 09', date: '2026-03-09',
    laps: 50, distance: 308.450, lapRecord: '1:30.734', lapRecordHolder: 'L. Hamilton', lapRecordYear: 2021,
    topSpeed: 328, elevation: 1, drsZones: 3, corners: 27,
    winner: 'Lando Norris', polePosition: 'L. Norris', fastestLap: 'M. Verstappen',
    weather: { ambient: 28, track: 38, humidity: 60, wind: 8 },
    circuitPath: 'M 30 50 L 35 30 L 50 20 L 70 25 L 80 40 L 75 60 L 65 70 L 50 75 L 35 70 L 30 50 Z',
    isSprint: false, engineMode: 'POWER', tyreStrategy: 'SOFT → MEDIUM',
  },
  {
    id: 'miami-2026', slug: 'miami', round: 3,
    name: 'Miami Grand Prix', city: 'Miami', country: 'United States',
    circuit: 'Miami International Autodrome',
    continent: 'americas', type: 'sprint', status: 'completed',
    dateRange: 'MAY 05', date: '2026-05-05',
    laps: 57, distance: 308.326, lapRecord: '1:29.708', lapRecordHolder: 'M. Verstappen', lapRecordYear: 2023,
    topSpeed: 320, elevation: 2, drsZones: 3, corners: 19,
    winner: 'Charles Leclerc', polePosition: 'C. Leclerc', fastestLap: 'C. Leclerc',
    weather: { ambient: 33, track: 52, humidity: 68, wind: 15 },
    circuitPath: 'M 40 30 L 70 25 L 85 40 L 80 60 L 65 72 L 45 75 L 30 60 L 30 45 L 40 30 Z',
    isSprint: true, engineMode: 'HIGH POWER', tyreStrategy: 'SOFT → HARD',
  },
  {
    id: 'madrid-2026', slug: 'madrid', round: 4,
    name: 'Madrid Grand Prix', city: 'Madrid', country: 'Spain',
    circuit: 'IFEMA Madrid Circuit',
    continent: 'europe', type: 'sprint', status: 'upcoming',
    dateRange: 'MAY 19', date: '2026-05-28',
    laps: 54, distance: 295.5, lapRecord: '–', lapRecordHolder: '–', lapRecordYear: 2026,
    topSpeed: 322, elevation: 12, drsZones: 2, corners: 22,
    weather: { ambient: 32, track: 48, humidity: 14, wind: 12 },
    circuitPath: 'M 50 20 L 75 30 L 85 55 L 75 75 L 50 82 L 28 72 L 18 50 L 28 28 L 50 20 Z',
    isSprint: true, engineMode: 'BALANCED', tyreStrategy: 'MEDIUM → HARD',
  },
  {
    id: 'suzuka-2026', slug: 'suzuka', round: 5,
    name: 'Japanese Grand Prix', city: 'Suzuka', country: 'Japan',
    circuit: 'Suzuka International Racing Course',
    continent: 'asia', type: 'standard', status: 'upcoming',
    dateRange: 'APR 07', date: '2026-04-07',
    laps: 53, distance: 307.471, lapRecord: '1:30.983', lapRecordHolder: 'L. Hamilton', lapRecordYear: 2019,
    topSpeed: 316, elevation: 45, drsZones: 2, corners: 18,
    weather: { ambient: 18, track: 26, humidity: 42, wind: 10 },
    circuitPath: 'M 50 15 C 75 15 90 35 85 55 C 80 70 65 80 50 82 C 35 80 20 70 18 55 C 15 35 28 15 50 15 Z M 50 15 L 60 35 L 50 50',
    isSprint: false, engineMode: 'HIGH DOWNFORCE', tyreStrategy: 'MEDIUM → MEDIUM',
  },
  {
    id: 'monaco-2026', slug: 'monaco', round: 6,
    name: 'Monaco Grand Prix', city: 'Monaco', country: 'Monaco',
    circuit: 'Circuit de Monaco',
    continent: 'europe', type: 'standard', status: 'locked',
    dateRange: 'MAY 25', date: '2026-05-25',
    laps: 78, distance: 260.286, lapRecord: '1:12.909', lapRecordHolder: 'L. Hamilton', lapRecordYear: 2021,
    topSpeed: 290, elevation: 42, drsZones: 1, corners: 19,
    weather: { ambient: 24, track: 35, humidity: 48, wind: 6 },
    circuitPath: 'M 50 20 L 65 25 L 72 38 L 68 55 L 55 65 L 40 68 L 30 58 L 28 42 L 35 28 L 50 20 Z',
    isSprint: false, engineMode: 'MAX DOWNFORCE', tyreStrategy: 'SOFT → SOFT',
  },
  {
    id: 'montreal-2026', slug: 'montreal', round: 7,
    name: 'Canadian Grand Prix', city: 'Montreal', country: 'Canada',
    circuit: 'Circuit Gilles Villeneuve',
    continent: 'americas', type: 'standard', status: 'locked',
    dateRange: 'JUN 08', date: '2026-06-08',
    laps: 70, distance: 305.270, lapRecord: '1:13.078', lapRecordHolder: 'V. Bottas', lapRecordYear: 2019,
    topSpeed: 335, elevation: 3, drsZones: 3, corners: 14,
    weather: { ambient: 22, track: 32, humidity: 55, wind: 14 },
    circuitPath: 'M 35 25 L 65 22 L 78 40 L 75 62 L 58 75 L 38 72 L 25 55 L 28 35 L 35 25 Z',
    isSprint: false, engineMode: 'POWER', tyreStrategy: 'MEDIUM → HARD',
  },
  {
    id: 'barcelona-2026', slug: 'barcelona', round: 8,
    name: 'Spanish Grand Prix', city: 'Barcelona', country: 'Spain',
    circuit: 'Circuit de Barcelona-Catalunya',
    continent: 'europe', type: 'standard', status: 'locked',
    dateRange: 'JUN 22', date: '2026-06-22',
    laps: 66, distance: 307.104, lapRecord: '1:18.149', lapRecordHolder: 'M. Verstappen', lapRecordYear: 2021,
    topSpeed: 319, elevation: 28, drsZones: 2, corners: 16,
    weather: { ambient: 28, track: 44, humidity: 30, wind: 8 },
    circuitPath: 'M 45 20 L 68 25 L 80 45 L 78 65 L 60 78 L 38 76 L 22 60 L 22 40 L 35 25 L 45 20 Z',
    isSprint: false, engineMode: 'BALANCED', tyreStrategy: 'MEDIUM → HARD',
  },
]

export const getRaceBySlug = (slug: string) => races.find(r => r.slug === slug)
export const completedRaces = races.filter(r => r.status === 'completed')
export const upcomingRaces  = races.filter(r => r.status === 'upcoming')
export const nextRace       = upcomingRaces[0]
