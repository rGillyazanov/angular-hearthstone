import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { GetAllMechanics } from "./mechanic.actions";
import { MechanicStateModel } from "./mechanic-state.model";
import { Mechanic } from "../../shared/models/filters-types";
import { MechanicService } from "../../shared/services/mechanic/mechanic.service";

@State<MechanicStateModel>({
  name: 'mechanics',
  defaults: {
    mechanics: []
  }
})
@Injectable()
export class MechanicState {
  @Selector()
  static mechanics(state: MechanicStateModel): Mechanic[] {
    return state.mechanics;
  }

  constructor(private mechanicsService: MechanicService) {}

  @Action(GetAllMechanics)
  getAllMechanics(ctx: StateContext<MechanicStateModel>) {
    const state = ctx.getState();
    return this.mechanicsService.getMechanicsList().pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          mechanics: result
        });
      })
    );
  }
}
