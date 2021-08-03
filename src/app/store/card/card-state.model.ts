import { Hero, Mechanic, PackSet, Race, Rarity, Type } from "../../shared/models/filters-types";

export interface ICard {
  armor: number | null,
  artist: string,
  attack: number | null,
  collectible: number,
  cost: number | { common: number | undefined, gold: number } | null,
  dbfId: number,
  durability: boolean | null,
  flavor: string,
  health: number | null
  hero: Hero,
  heroes: [],
  id: number,
  id_card: string,
  mechanics: Array<Mechanic>,
  name: string,
  packset: PackSet,
  race: Race,
  rarity: Rarity,
  tags: Array<{name: string}>,
  text: string,
  type: Type
}

export interface CardStateModel {
  card: ICard;
  loading: boolean,
  loaded: boolean
}
