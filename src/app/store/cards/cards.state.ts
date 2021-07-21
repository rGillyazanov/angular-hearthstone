import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { CardsStateModel, IAllCards } from "./cards-state.model";
import { GetCardsOfPage, FiltersCards } from "./cards.actions";
import { CardsService } from "../../shared/services/cards/cards.service";

@State<CardsStateModel>({
  name: 'cards',
  defaults: {
    current_page: 0,
    data: [],
    from: 0,
    last_page: 0,
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: '',
    to: 0,
    total: 0
  }
})
@Injectable()
export class CardsState {
  @Selector()
  static data(state: CardsStateModel): IAllCards[] {
    return state.data;
  }

  @Selector()
  static nextPageUrl(state: CardsStateModel): string {
    return state.next_page_url;
  }

  @Selector()
  static previousPageUrl(state: CardsStateModel): string {
    return state.prev_page_url;
  }

  @Selector()
  static total(state: CardsStateModel): number {
    return state.total;
  }

  @Selector()
  static currentPage(state: CardsStateModel): number {
    return state.current_page;
  }

  constructor(private cardsService: CardsService) {}

  @Action(GetCardsOfPage)
  getCardsOfPage(ctx: StateContext<CardsStateModel>, action: GetCardsOfPage) {
    const state = ctx.getState();
    return this.cardsService.getCards(action.payload.page, action.payload.filteredParameters).pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          current_page: result.current_page,
          data: result.data,
          from: result.from,
          last_page: result.last_page,
          next_page_url: result.next_page_url,
          path: result.path,
          per_page: result.per_page,
          prev_page_url: result.prev_page_url,
          to: result.to,
          total: result.total
        });
      })
    );
  }

  @Action(FiltersCards)
  getFilteredCards(ctx: StateContext<CardsStateModel>, action: FiltersCards) {
    const state = ctx.getState();
    return this.cardsService.getFilteredOfCards(action.payload).pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          current_page: result.current_page,
          data: result.data,
          from: result.from,
          last_page: result.last_page,
          next_page_url: result.next_page_url,
          path: result.path,
          per_page: result.per_page,
          prev_page_url: result.prev_page_url,
          to: result.to,
          total: result.total
        });
      })
    );
  }
}
