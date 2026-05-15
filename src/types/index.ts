export type RaceType = 'standard' | 'sprint';

export type Continent =
  | 'europe'
  | 'americas'
  | 'asia'
  | 'middle-east'
  | 'oceania';

export interface Race {
  id: string;
  round: number;
  name: string;
  shortName: string;
  circuit: string;
  city: string;
  country: string;
  continent: Continent;
  flag: string;
  dateStart: string;
  dateEnd: string;
  laps: number;
  circuitLength: number;
  totalDistance: number;
  type: RaceType;
  isNew: boolean;
  description: string;
}

export type ContinentFilter = 'all' | Continent;
export type TypeFilter = 'all' | RaceType;
