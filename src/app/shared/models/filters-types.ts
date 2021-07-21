export interface BaseNameType {
  id: number,
  name: string
}

export type Race = Partial<BaseNameType>;
export type Hero = Partial<BaseNameType>;
export type PackSet = Partial<BaseNameType>;
export type Mechanic = Partial<BaseNameType>;
export type Rarity = Partial<BaseNameType>;
export type Type = Partial<BaseNameType>;
