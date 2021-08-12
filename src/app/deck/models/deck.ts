import { Hero } from "../../shared/models/filters-types";
import { ICard } from "../../store/card/card-state.model";

export class Deck {
  private cards: ICard[];

  constructor(private readonly hero: Hero,
              private format: 1 | 2 = 1) {
    this.cards = new Array<ICard>();
  }

  get Cards(): ICard[] {
    return this.cards;
  }

  get Hero(): Hero {
    return this.hero;
  }

  get Format(): 1 | 2 {
    return this.format;
  }

  set Format(value: 1 | 2) {
    this.format = value;
  }

  addCard(card: ICard) {
    this.cards.push(card);
  }

  removeCard(index: number) {
    if (this.cards.length > 0) {
      this.cards = this.cards.splice(index, 1);
    }

    throw Error('Cards of deck empty');
  }
}
