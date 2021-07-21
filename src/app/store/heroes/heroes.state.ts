import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { GetAllHeroes } from "./heroes.actions";
import { HeroesService } from "../../shared/services/heroes/heroes.service";
import { HeroesStateModel } from "./heroes-state.model";
import { Hero } from "../../shared/models/filters-types";

@State<HeroesStateModel>({
  name: 'heroes',
  defaults: {
    heroes: []
  }
})
@Injectable()
export class HeroesState {
  @Selector()
  static heroes(state: HeroesStateModel): Hero[] {
    return state.heroes;
  }

  constructor(private heroesService: HeroesService) {}

  @Action(GetAllHeroes)
  getAllHeroes(ctx: StateContext<HeroesStateModel>) {
    const state = ctx.getState();
    return this.heroesService.getHeroesList().pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          heroes: result
        });
      })
    );
  }
}
