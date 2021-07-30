export interface IAllCards {
  id: number,
  id_card: string,
  name: string
}

export interface CardsStateModel {
  current_page: number;
  data: IAllCards[];
  from: number;
  last_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  loading: boolean,
  loaded: boolean
}
