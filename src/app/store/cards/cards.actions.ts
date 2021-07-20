export class GetAllCards {
  static readonly type = '[Cards] Get all cards';
}

export class ChangePage {
  static readonly type = '[Cards] Get cards of other page';

  constructor(public payload: { page: number }) {
  }
}
