import { Hero, Mechanic, PackSet, Race, Rarity, Type } from "../../../shared/models/filters-types";
import { IAllCards } from "../../../store/cards/cards-state.model";
import { ICostCard } from "../../../store/card/card-state.model";

export interface ICardInDeck {
  cost: number | ICostCard | null,
  dbfId: number,
  id: number,
  id_card: string,
  name: string,
  rarity: Rarity,
}

export interface DeckStateModel {
  hero: Hero,
  cards: ICardInDeck[];
  totalOfCards: number;
  cardsOfHeroLoading: boolean,
  cardsOfHeroLoaded: boolean
  heroOfDeckLoading: boolean,
  heroOfDeckLoaded: boolean
}
