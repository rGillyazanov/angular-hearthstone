import { CardsFilterStateModel } from "../cards-filter/cards-filter-state.model";

export class GetCardsOfPage {
  static readonly type = '[Cards] Get cards of other page';

  constructor(public payload: { page: number, filteredParameters?: CardsFilterStateModel }) {
  }
}

export class CardsLoading {
  static readonly type = '[Cards] Cards loading...';
}

export class CardsLoaded {
  static readonly type = '[Cards] Cards loaded';
}

export class FiltersCards {
  static readonly type = '[Filters] Filters cards';

  constructor(public payload: CardsFilterStateModel) {
  }
}
