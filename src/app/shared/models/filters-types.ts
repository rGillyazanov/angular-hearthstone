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
  mechanic: number | null
}

export type Race = Partial<BaseNameType>;
export type Hero = Partial<BaseNameType>;
export type PackSet = Partial<BaseNameType>;
export type Mechanic = Partial<BaseNameType>;
export type Rarity = Partial<BaseNameType>;
export type Type = Partial<BaseNameType>;
