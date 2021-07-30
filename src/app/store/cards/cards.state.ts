import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { finalize, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { CardsStateModel, IAllCards } from "./cards-state.model";
import { GetCardsOfPage, FiltersCards, CardsLoading, CardsLoaded } from "./cards.actions";
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
    total: 0,
    loading: false,
    loaded: false
  }
})
@Injectable()
export class CardsState implements NgxsOnInit {
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

  @Selector()
  static loading(state: CardsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static loaded(state: CardsStateModel): boolean {
    return state.loaded;
  }

  constructor(private cardsService: CardsService) {
  }

  ngxsOnInit(ctx?: StateContext<CardsStateModel>) {
    ctx?.dispatch(new GetCardsOfPage({
      page: 1
    }));
  }

  @Action(GetCardsOfPage)
  getCardsOfPage(ctx: StateContext<CardsStateModel>, action: GetCardsOfPage) {
    const state = ctx.getState();

    ctx.dispatch(new CardsLoading());

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
          total: result.total,
        });
      }),
      finalize(() => {
        ctx.dispatch(new CardsLoaded());
      })
    );
  }

  @Action(FiltersCards)
  getFilteredCards(ctx: StateContext<CardsStateModel>, action: FiltersCards) {
    const state = ctx.getState();

    ctx.dispatch(new CardsLoading());

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
      }),
      finalize(() => {
        ctx.dispatch(new CardsLoaded());
      })
    );
  }

  @Action(CardsLoading)
  setCardsLoading({ getState, patchState }: StateContext<CardsStateModel>) {
    const state = getState();
    patchState({
      ...state,
      loaded: false,
      loading: true
    });
  }

  @Action(CardsLoaded)
  setCardsLoaded({ getState, patchState }: StateContext<CardsStateModel>) {
    const state = getState();
    patchState({
      ...state,
      loaded: true,
      loading: false
    });
  }
}
