import { CardsFilterStateModel } from "../cards-filter/cards-filter-state.model";

export class GetCardsOfPage {
  static readonly type = '[Cards] Get cards of other page';

  constructor(public payload: { page: number, filteredParameters?: CardsFilterStateModel }) {
  }
}

export class FiltersCards {
  static readonly type = '[Filters] Filters cards';

  constructor(public payload: CardsFilterStateModel) {
  }
}
