import { Action, Selector, State, StateContext } from "@ngxs/store";
import { finalize, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { CardStateModel, ICard } from "./card-state.model";
import {
  CardLoaded,
  CardLoading,
  GetCardInfo
} from "./card.actions";
import { CardsService } from "../../shared/services/cards/cards.service";

@State<CardStateModel>({
  name: 'card',
  defaults: {
    card: {} as ICard,
    loading: false,
    loaded: false
  }
})
@Injectable()
export class CardState {
  @Selector()
  static card(state: CardStateModel): ICard {
    return state.card;
  }

  @Selector()
  static loading(state: CardStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static loaded(state: CardStateModel): boolean {
    return state.loaded;
  }

  constructor(private cardsService: CardsService) {
  }

  @Action(GetCardInfo)
  getCardInformation(ctx: StateContext<CardStateModel>, action: GetCardInfo) {
    const state = ctx.getState();

    ctx.dispatch(new CardLoading());

    return this.cardsService.getCard(action.id).pipe(
      tap((result) => {
        return ctx.patchState({
          ...state,
          card: result
        });
      }),
      finalize(() => {
        ctx.dispatch(new CardLoaded());
      })
    );
  }

  @Action(CardLoading)
  setCardsLoading({ getState, patchState }: StateContext<CardStateModel>) {
    const state = getState();
    patchState({
      ...state,
      loaded: false,
      loading: true
    });
  }

  @Action(CardLoaded)
  setCardsLoaded({ getState, patchState }: StateContext<CardStateModel>) {
    const state = getState();
    patchState({
      ...state,
      loaded: true,
      loading: false
    });
  }
}
