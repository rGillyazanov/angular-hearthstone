export class GetCardInfo {
  static readonly type = '[Card] Get card information';

  constructor(public id: number) {
  }
}

export class CardLoading {
  static readonly type = '[Card] Card loading...';
}

export class CardLoaded {
  static readonly type = '[Card] Card loaded';
}
