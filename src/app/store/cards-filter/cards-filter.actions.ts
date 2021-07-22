export class SetHero {
  static readonly type = '[Filter cards] Set hero in filter';

  constructor(public hero: number | null) {
  }
}

export class SetRace {
  static readonly type = '[Filter cards] Set race in filter';

  constructor(public race: number | null) {
  }
}

export class SetPackSet {
  static readonly type = '[Filter cards] Set pack set in filter';

  constructor(public packSet: number | null) {
  }
}

export class SetRarity {
  static readonly type = '[Filter cards] Set rarity in filter';

  constructor(public rarity: number | null) {
  }
}

export class SetType {
  static readonly type = '[Filter cards] Set type in filter';

  constructor(public type: number | null) {
  }
}

export class SetMechanic {
  static readonly type = '[Filter cards] Set mechanic in filter';

  constructor(public mechanic: number | null) {
  }
}

export class SetCostActive {
  static readonly type = '[Filter cards] Set cost active in filter';

  constructor(public active: boolean) {
  }
}

export class SetCost {
  static readonly type = '[Filter cards] Set cost in filter';

  constructor(public cost: number) {
  }
}

export class SetAttackActive {
  static readonly type = '[Filter cards] Set attack active in filter';

  constructor(public active: boolean) {
  }
}

export class SetAttack {
  static readonly type = '[Filter cards] Set attack in filter';

  constructor(public attack: number) {
  }
}

export class SetHealthActive {
  static readonly type = '[Filter cards] Set health active in filter';

  constructor(public active: boolean) {
  }
}

export class SetHealth {
  static readonly type = '[Filter cards] Set health in filter';

  constructor(public health: number) {
  }
}

export class SetSort {
  static readonly type = '[Filter cards] Set sort in filter';

  constructor(public sort: { type: string; name: string; }) {
  }
}
