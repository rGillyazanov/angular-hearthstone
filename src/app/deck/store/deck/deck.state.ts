import { Action, Selector, State, StateContext } from "@ngxs/store";
import { finalize, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DeckStateModel, ICardInDeck } from "./deck-state.model";
import { IAllCards } from "../../../store/cards/cards-state.model";
import { Hero } from "../../../shared/models/filters-types";
import {
  CardsOfHeroLoaded,
  CardsOfHeroLoading,
  GetCardsOfHero, GetHeroOfDeck, HeroOfDeckLoaded, HeroOfDeckLoading
} from "./deck.actions";

import { DeckService } from "../../services/deck.service";
import { HeroesService } from "../../../shared/services/heroes/heroes.service";

@State<DeckStateModel>({
  name: 'deck',
  defaults: {
    hero: {} as Hero,
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
  static hero(state: DeckStateModel): Hero {
    return state.hero;
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

  constructor(private deckService: DeckService,
              private heroesService: HeroesService) {
  }

  @Action(GetHeroOfDeck)
  getHeroOfDeck(ctx: StateContext<DeckStateModel>, action: GetHeroOfDeck) {
    const state = ctx.getState();

    ctx.dispatch(new HeroOfDeckLoading());

    return this.heroesService.getHero(action.heroId).pipe(
      tap((hero) => {
        return ctx.patchState({
          hero: hero
        });
      }),
      finalize(() => {
        ctx.dispatch(new HeroOfDeckLoaded());
      })
    );
  }

  @Action(GetCardsOfHero)
  getCardsOfHero(ctx: StateContext<DeckStateModel>, action: GetCardsOfHero) {
    const state = ctx.getState();

    ctx.dispatch(new CardsOfHeroLoading());

    return this.deckService.getCardsOfHero(action.heroId).pipe(
      tap((cardsOfHero) => {
        return ctx.patchState({
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
}
