import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { PackSetStateModel } from "./packSet-state.model";
import { PackSet } from "../../shared/models/filters-types";
import { PacksetService } from "../../shared/services/packset/packset.service";
import { GetAllPackSets } from "./packSet.actions";

@State<PackSetStateModel>({
  name: 'packSets',
  defaults: {
    packSets: []
  }
})
@Injectable()
export class PackSetState {
  @Selector()
  static packSets(state: PackSetStateModel): PackSet[] {
    return state.packSets;
  }

  constructor(private packSetService: PacksetService) {}

  @Action(GetAllPackSets)
  getAllPackSets(ctx: StateContext<PackSetStateModel>) {
    const state = ctx.getState();
    return this.packSetService.getPackSetList().pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          packSets: result
        });
      })
    );
  }
}
