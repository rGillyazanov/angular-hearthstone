import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { finalize, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { Deck, DeckStateModel, ICardInDeck } from "./deck-state.model";

import {
  AddCardInDeck,
  CardsOfHeroLoaded,
  CardsOfHeroLoading,
  GetCardsOfHero, GetHeroOfDeck, HeroOfDeckLoaded, HeroOfDeckLoading, SetHeroInDeck
} from "./deck.actions";

import { DeckService } from "../../services/deck.service";
import { HeroesService } from "../../../shared/services/heroes/heroes.service";

@State<DeckStateModel>({
  name: 'deck',
  defaults: {
    deck: {
      cards: [],
      format: 1,
      hero: {}
    },
    cards: [],
    totalOfCards: 0,
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

    return this.deckService.getCardsOfHero(action.heroId).pipe(
      tap((cardsOfHero) => {
        ctx.patchState({
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
  addCardInDeck({ patchState, getState }: StateContext<DeckStateModel>, action: AddCardInDeck) {
    patchState({
      deck: {
        ...getState().deck,
        cards: this.addCard(action.card)
      }
    })
  }

  private addCard(card: ICardInDeck): ICardInDeck[] {
    const deck = this.store.selectSnapshot(DeckState.deck);

    if (deck.cards.length >= 30) {
      return [...deck.cards];
    }

    if (!this.deckService.isCardExits(card)) {
      return [...deck.cards, card];
    } else {
      const countInDeck = this.deckService.countOfCardsInDeck(card);

      if (countInDeck < 2 && card.rarity.id !== 4) {
        return [...deck.cards, card];
      }
    }

    return [...deck.cards];
  }
}
