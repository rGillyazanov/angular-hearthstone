import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { CardsStateModel, IAllCards } from "./cards-state.model";
import { ChangePage, GetAllCards } from "./cards.actions";
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

  constructor(private cardsService: CardsService) {}

  @Action(GetAllCards)
  getAllCards(ctx: StateContext<CardsStateModel>) {
    const state = ctx.getState();
    return this.cardsService.getAllCards().pipe(
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

  @Action(ChangePage)
  getCardsOfNextPage(ctx: StateContext<CardsStateModel>, action: ChangePage) {
    const state = ctx.getState();
    return this.cardsService.getCardsOfPage(action.payload.url).pipe(
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
