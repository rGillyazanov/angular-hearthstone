import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { CardsFilterStateModel } from "./cards-filter-state.model";

import {
  SetAttack, SetAttackActive,
  SetCost, SetCostActive, SetHealth, SetHealthActive,
  SetHero,
  SetMechanic,
  SetPackSet,
  SetRace,
  SetRarity, SetSort,
  SetType
} from "./cards-filter.actions";
import { GetAllRaces } from "../race/race.actions";
import { GetAllHeroes } from "../heroes/heroes.actions";
import { GetAllRarities } from "../rarity/rarity.actions";
import { GetAllTypes } from "../type/type.actions";
import { GetAllPackSets } from "../packSet/packSet.actions";
import { GetAllMechanics } from "../mechanic/mechanic.actions";

@State<CardsFilterStateModel>({
  name: 'cardsFilter',
  defaults: {
    heroes: null,
    race: null,
    packSet: null,
    rarity: null,
    type: null,
    mechanic: null,
    cost: {
      on: false,
      value: 5
    },
    attack: {
      on: false,
      value: 5
    },
    health: {
      on: false,
      value: 5
    },
    sortBy: {
      value: null,
      options: [
        {
          label: 'Атаке: по возрастанию',
          field: {
            type: 'asc',
            name: 'attack'
          }
        },
        {
          label: 'Атака: по убыванию',
          field: {
            type: 'desc',
            name: 'attack'
          }
        },
        {
          label: 'Здоровье: по возрастанию',
          field: {
            type: 'asc',
            name: 'health'
          }
        },
        {
          label: 'Здоровье: по убыванию',
          field: {
            type: 'desc',
            name: 'health'
          }
        },
        {
          label: 'Мана: по возрастанию',
          field: {
            type: 'asc',
            name: 'cost'
          }
        },
        {
          label: 'Мана: по убыванию',
          field: {
            type: 'desc',
            name: 'cost'
          }
        }
      ]
    }
  }
})
@Injectable()
export class CardsFilterState implements NgxsOnInit {
  @Selector()
  static heroes(state: CardsFilterStateModel): number | null {
    return state.heroes;
  }

  @Selector()
  static race(state: CardsFilterStateModel): number | null {
    return state.race;
  }

  @Selector()
  static rarity(state: CardsFilterStateModel): number | null {
    return state.rarity;
  }

  @Selector()
  static type(state: CardsFilterStateModel): number | null {
    return state.type;
  }

  @Selector()
  static mechanic(state: CardsFilterStateModel): number | null {
    return state.mechanic;
  }

  @Selector()
  static packSet(state: CardsFilterStateModel): number | null {
    return state.packSet;
  }

  @Selector()
  static costActive(state: CardsFilterStateModel): boolean {
    return state.cost.on;
  }

  @Selector()
  static cost(state: CardsFilterStateModel): number {
    return state.cost.value;
  }

  @Selector()
  static attackActive(state: CardsFilterStateModel): boolean {
    return state.attack.on;
  }

  @Selector()
  static attack(state: CardsFilterStateModel): number {
    return state.attack.value;
  }

  @Selector()
  static healthActive(state: CardsFilterStateModel): boolean {
    return state.health.on;
  }

  @Selector()
  static health(state: CardsFilterStateModel): number {
    return state.health.value;
  }

  @Selector()
  static sort(state: CardsFilterStateModel): { type: string; name: string; } | null {
    return state.sortBy.value;
  }

  @Selector()
  static sortOptions(state: CardsFilterStateModel): Array<{ label: string; field: { type: string; name: string; } }> {
    return state.sortBy.options;
  }

  constructor() {
  }

  ngxsOnInit(ctx?: StateContext<CardsFilterStateModel>) {
    ctx?.dispatch([
      new GetAllRaces(),
      new GetAllHeroes(),
      new GetAllRarities(),
      new GetAllTypes(),
      new GetAllPackSets(),
      new GetAllMechanics()
    ]);
  }

  @Action(SetHero)
  setHero(ctx: StateContext<CardsFilterStateModel>, action: SetHero) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      heroes: action.hero
    });
  }

  @Action(SetRace)
  setRace(ctx: StateContext<CardsFilterStateModel>, action: SetRace) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      race: action.race
    });
  }

  @Action(SetPackSet)
  setPackSet(ctx: StateContext<CardsFilterStateModel>, action: SetPackSet) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      packSet: action.packSet
    });
  }

  @Action(SetRarity)
  setRarity(ctx: StateContext<CardsFilterStateModel>, action: SetRarity) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      rarity: action.rarity
    });
  }

  @Action(SetType)
  setType(ctx: StateContext<CardsFilterStateModel>, action: SetType) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      type: action.type
    });
  }

  @Action(SetMechanic)
  setMechanic(ctx: StateContext<CardsFilterStateModel>, action: SetMechanic) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      mechanic: action.mechanic
    });
  }

  @Action(SetCostActive)
  setCostActive(ctx: StateContext<CardsFilterStateModel>, action: SetCostActive) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      cost: {
        on: action.active,
        value: state.cost.value
      }
    });
  }

  @Action(SetCost)
  setCost(ctx: StateContext<CardsFilterStateModel>, action: SetCost) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      cost: {
        on: state.cost.on,
        value: action.cost
      }
    });
  }

  @Action(SetAttackActive)
  setAttackActive(ctx: StateContext<CardsFilterStateModel>, action: SetAttackActive) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      attack: {
        on: action.active,
        value: state.attack.value
      }
    });
  }

  @Action(SetAttack)
  setAttack(ctx: StateContext<CardsFilterStateModel>, action: SetAttack) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      attack: {
        on: state.attack.on,
        value: action.attack
      }
    });
  }

  @Action(SetHealthActive)
  setHealthActive(ctx: StateContext<CardsFilterStateModel>, action: SetHealthActive) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      health: {
        on: action.active,
        value: state.health.value
      }
    });
  }

  @Action(SetHealth)
  setHealth(ctx: StateContext<CardsFilterStateModel>, action: SetHealth) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      health: {
        on: state.health.on,
        value: action.health
      }
    });
  }

  @Action(SetSort)
  setSort(ctx: StateContext<CardsFilterStateModel>, action: SetSort) {
    const state = ctx.getState();
    return ctx.patchState({
      ...state,
      sortBy: {
        value: action.sort,
        options: state.sortBy.options
      }
    });
  }
}
