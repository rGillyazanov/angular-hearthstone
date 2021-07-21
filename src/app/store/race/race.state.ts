import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { GetAllRaces } from "./race.actions";
import { RaceStateModel } from "./race-state.model";
import { Race } from "../../shared/models/filters-types";
import { RaceService } from "../../shared/services/race/race.service";

@State<RaceStateModel>({
  name: 'races',
  defaults: {
    races: []
  }
})
@Injectable()
export class RaceState {
  @Selector()
  static races(state: RaceStateModel): Race[] {
    return state.races;
  }

  constructor(private raceService: RaceService) {}

  @Action(GetAllRaces)
  getAllRaces(ctx: StateContext<RaceStateModel>) {
    const state = ctx.getState();
    return this.raceService.getRacesList().pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          races: result
        });
      })
    );
  }
}
