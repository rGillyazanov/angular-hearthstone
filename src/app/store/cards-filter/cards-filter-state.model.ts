export interface CardsFilterStateModel {
  heroes: number | null,
  race: number | null,
  packSet: number | null,
  rarity: number | null,
  type: number | null,
  mechanic: number | null,
  cost: {
    on: boolean,
    value: number
  },
  attack: {
    on: boolean,
    value: number
  },
  health: {
    on: boolean,
    value: number
  },
  sortBy: {
    value: { type: string; name: string; } | null,
    options: Array<{ label: string; field: { type: string; name: string; } }>
  }
}
