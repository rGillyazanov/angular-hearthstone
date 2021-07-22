export interface BaseNameType {
  id: number,
  name: string
}

export interface IFiltersCards {
  heroes: number | null,
  race: number | null,
  packSet: number | null,
  rarity: number | null,
  type: number | null,
  mechanic: number | null,
  cost: {
    on: boolean,
    value: number
  },
  attack: {
    on: boolean,
    value: number
  },
  health: {
    on: boolean,
    value: number
  },
  sortBy: {
    value: null,
    options: Array<{ label: string; field: { type: string; name: string; } }>
  }
}

export type Race = Partial<BaseNameType>;
export type Hero = Partial<BaseNameType>;
export type PackSet = Partial<BaseNameType>;
export type Mechanic = Partial<BaseNameType>;
export type Rarity = Partial<BaseNameType>;
export type Type = Partial<BaseNameType>;
