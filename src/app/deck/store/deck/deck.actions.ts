export class GetCardsOfHero {
  static readonly type = '[Deck] Get cards of hero';

  constructor(public heroId: number) {
  }
}

export class GetHeroOfDeck {
  static readonly type = '[Deck] Get hero of deck';

  constructor(public heroId: number) {
  }
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
