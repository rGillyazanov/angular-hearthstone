import { IFiltersCards } from "../../shared/models/filters-types";

export class GetCardsOfPage {
  static readonly type = '[Cards] Get cards of other page';

  constructor(public payload: { page: number, filteredParameters?: IFiltersCards }) {
  }
}

export class FiltersCards {
  static readonly type = '[Filters] Filters cards';

  constructor(public payload: IFiltersCards) {
  }
}
