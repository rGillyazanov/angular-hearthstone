import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { finalize, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { Deck, DeckStateModel, ICardInDeck } from "./deck-state.model";

import {
  AddCardInDeck,
  CardsOfHeroLoaded,
  CardsOfHeroLoading,
  GetCardsOfHero, GetCodeOfDeck,
  GetHeroOfDeck,
  HeroOfDeckLoaded,
  HeroOfDeckLoading,
  RemoveCardFromDeck,
  SetHeroInDeck,
  SortedCardInDeck
} from "./deck.actions";

import { DeckService } from "../../services/deck.service";
import { HeroesService } from "../../../shared/services/heroes/heroes.service";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { DeckDefinition, DeckList, encode } from 'deckstrings';

@State<DeckStateModel>({
  name: 'deck',
  defaults: {
    deck: {
      cards: new Array<{ card: ICardInDeck, count: number }>(),
      format: 1,
      hero: {}
    },
    cards: [],
    totalOfCards: 0,
    currentPage: 0,
    perPage: 0,
    cardsOfHeroLoading: false,
    cardsOfHeroLoaded: false,
    heroOfDeckLoading: false,
    heroOfDeckLoaded: false
  }
})
@Injectable()
export class DeckState {
  @Selector()
  static deck(state: DeckStateModel): Deck {
    return state.deck;
  }

  @Selector()
  static totalOfCards(state: DeckStateModel): number {
    return state.totalOfCards;
  }

  @Selector()
  static currentPage(state: DeckStateModel): number {
    return state.currentPage;
  }

  @Selector()
  static perPage(state: DeckStateModel): number {
    return state.perPage;
  }

  @Selector()
  static countCardsInDeck(state: DeckStateModel): number {
    return state.deck.cards.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.count;
    }, 0);
  }

  @Selector()
  static cards(state: DeckStateModel): ICardInDeck[] {
    return state.cards;
  }

  @Selector()
  static cardsOfHeroLoading(state: DeckStateModel): boolean {
    return state.cardsOfHeroLoading;
  }

  @Selector()
  static cardsOfHeroLoaded(state: DeckStateModel): boolean {
    return state.cardsOfHeroLoaded;
  }

  @Selector()
  static heroOfDeckLoading(state: DeckStateModel): boolean {
    return state.heroOfDeckLoading;
  }

  @Selector()
  static heroOfDeckLoaded(state: DeckStateModel): boolean {
    return state.heroOfDeckLoaded;
  }

  constructor(private store: Store,
              private deckService: DeckService,
              private heroesService: HeroesService) {
  }

  @Action(GetHeroOfDeck)
  getHeroOfDeck(ctx: StateContext<DeckStateModel>, action: GetHeroOfDeck) {
    ctx.dispatch(new HeroOfDeckLoading());

    return this.heroesService.getHero(action.heroId).pipe(
      tap((hero) => {
        ctx.dispatch(new SetHeroInDeck(hero))
      }),
      finalize(() => {
        ctx.dispatch(new HeroOfDeckLoaded());
      })
    );
  }

  @Action(GetCardsOfHero)
  getCardsOfHero(ctx: StateContext<DeckStateModel>, action: GetCardsOfHero) {
    ctx.dispatch(new CardsOfHeroLoading());

    return this.deckService.getCardsOfHero(action.heroId, action.page).pipe(
      tap((cardsOfHero) => {
        ctx.patchState({
          perPage: cardsOfHero.per_page,
          currentPage: cardsOfHero.current_page,
          totalOfCards: cardsOfHero.total,
          cards: cardsOfHero.data
        });
      }),
      finalize(() => {
        ctx.dispatch(new CardsOfHeroLoaded());
      })
    );
  }

  @Action(CardsOfHeroLoading)
  setCardsOfHeroLoading({ patchState }: StateContext<DeckStateModel>) {
    patchState({
      cardsOfHeroLoaded: false,
      cardsOfHeroLoading: true
    });
  }

  @Action(CardsOfHeroLoaded)
  setCardsOfHeroLoaded({ patchState }: StateContext<DeckStateModel>) {
    patchState({
      cardsOfHeroLoaded: true,
      cardsOfHeroLoading: false
    });
  }

  @Action(HeroOfDeckLoading)
  setHeroOfDeckLoading({ patchState }: StateContext<DeckStateModel>) {
    patchState({
      heroOfDeckLoaded: false,
      heroOfDeckLoading: true
    });
  }

  @Action(HeroOfDeckLoaded)
  setHeroOfDeckLoaded({ patchState }: StateContext<DeckStateModel>) {
    patchState({
      heroOfDeckLoaded: true,
      heroOfDeckLoading: false
    });
  }

  @Action(SetHeroInDeck)
  setDeck({ getState, patchState }: StateContext<DeckStateModel>, action: SetHeroInDeck) {
    patchState({
      deck: {
        ...getState().deck,
        hero: action.hero
      }
    });
  }

  @Action(AddCardInDeck)
  addCardInDeck(ctx: StateContext<DeckStateModel>, action: AddCardInDeck) {
    const countCardsInDeck = this.deckService.countAllOfCardsInDeck();

    if (countCardsInDeck >= 30) {
      return;
    }

    const countInDeck = this.deckService.countOfCardsInDeck(action.card);
    const isCardExits = this.deckService.isCardExits(action.card);

    if (isCardExits && countInDeck >= 2) {
      return;
    } else if (!isCardExits) {
      ctx.setState(patch({
        deck: patch({
          cards: append([{ card: action.card, count: 1 }])
        })
      }));
      ctx.dispatch(new SortedCardInDeck());
    } else if (countInDeck < 2 && action.card.rarity.id !== 4) {
      ctx.setState(patch({
        deck: patch({
          cards: updateItem<{ card: ICardInDeck, count: number }>(
            cardInDeck => cardInDeck?.card.dbfId === action.card.dbfId, { card: action.card, count: 2 })
        })
      }));
      ctx.dispatch(new SortedCardInDeck());
    }
  }

  @Action(SortedCardInDeck)
  sortCardInDeck({ getState, setState }: StateContext<DeckStateModel>) {
    /**
     * Сортировка карт в колоде по мане и стоимости
     * @param a
     * @param b
     */
    const sortCards = (a: any, b: any) => {
      const previous = a.card;
      const current = b.card;
      // @ts-ignore
      return (current.cost < previous.cost) - (previous.cost < current.cost) || (current.name < previous.name) - (previous.name < current.name);
    };

    const cards = [...getState().deck.cards].sort(sortCards);

    setState(patch({
      deck: patch({
        cards: cards
      })
    }));
  }

  @Action(RemoveCardFromDeck)
  removeCardFromDeck({ setState }: StateContext<DeckStateModel>, action: RemoveCardFromDeck) {
    const countInDeck = this.deckService.countOfCardsInDeck(action.card);

    if (countInDeck === 1) {
      setState(patch({
        deck: patch({
          cards: removeItem<{ card: ICardInDeck, count: number }>(
            cardInDeck => cardInDeck?.card.dbfId === action.card.dbfId
          )
        })
      }));
    } else if (countInDeck === 2) {
      setState(patch({
        deck: patch({
          cards: updateItem<{ card: ICardInDeck, count: number }>(
            cardInDeck => cardInDeck?.card.dbfId === action.card.dbfId, {
              card: action.card,
              count: 1
            }
          )
        })
      }));
    }
  }

  @Action(GetCodeOfDeck)
  getCodeOfDeck({ getState }: StateContext<DeckStateModel>) {
    const deck = getState().deck.cards.reduce((acc, card) => {
      return [...acc, [card.card.dbfId, card.count]];
    }, new Array<Array<number>>()) as DeckList;

    const encodeDeck: DeckDefinition = {
      cards: deck,
      format: 1,
      heroes: [getState().deck.hero.id as number]
    };

    console.log(encode(encodeDeck));
  }
}

