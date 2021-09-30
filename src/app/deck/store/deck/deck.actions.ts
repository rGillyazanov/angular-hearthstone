import { Hero } from "../../../shared/models/filters-types";
import { ICardInDeck } from "./deck-state.model";
import { FormatType } from 'deckstrings';

export class GetCardsOfHero {
  static readonly type = '[Deck] Get cards of hero';

  constructor(public heroId: number, public page?: number, public format?: FormatType) {
  }
}

export class GetHeroOfDeck {
  static readonly type = '[Deck] Get hero of deck';

  constructor(public heroId: number) {
  }
}

export class GetCodeOfDeck {
  static readonly type = '[Deck] Get code of deck';
}

export class CardsOfHeroLoading {
  static readonly type = '[Deck] Cards of hero loading...';
}

export class CardsOfHeroLoaded {
  static readonly type = '[Deck] Cards of hero loaded';
}

export class HeroOfDeckLoading {
  static readonly type = '[Deck] Hero of deck loading...';
}

export class HeroOfDeckLoaded {
  static readonly type = '[Deck] Hero of deck loaded';
}

export class SetHeroInDeck {
  static readonly type = '[Deck] Set hero in deck';

  constructor(public hero: Hero) {
  }
}

export class ChangeFormatOfDeck {
  static readonly type = '[Deck] Format of deck changed';

  constructor(public format: FormatType) {
  }
}

export class AddCardInDeck {
  static readonly type = '[Deck] Add card in deck';

  constructor(public card: ICardInDeck) {
  }
}

export class SortedCardInDeck {
  static readonly type = '[Deck] Sort card in deck';
}

export class RemoveCardFromDeck {
  static readonly type = '[Deck] Remove card from deck';

  constructor(public card: ICardInDeck) {
  }
}
