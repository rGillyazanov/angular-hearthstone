import { Hero, Rarity } from "../../../shared/models/filters-types";

export interface ICardInDeck {
  cost: number | null,
  dbfId: number,
  id: number,
  id_card: string,
  name: string,
  rarity: Rarity,
}

export interface Deck {
  cards: Array<{ card: ICardInDeck, count: number }>,
  format: 1 | 2,
  hero: Hero
}

export interface DeckStateModel {
  deck: Deck,
  cards: ICardInDeck[]; // Карты доступные для добавления в колоду
  totalOfCards: number;
  cardsOfHeroLoading: boolean,
  cardsOfHeroLoaded: boolean
  heroOfDeckLoading: boolean,
  heroOfDeckLoaded: boolean
}
