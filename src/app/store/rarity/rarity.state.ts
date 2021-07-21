import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { GetAllRarities } from "./rarity.actions";
import { RarityStateModel } from "./rarity-state.model";
import { Race } from "../../shared/models/filters-types";
import { RarityService } from "../../shared/services/rarity/rarity.service";

@State<RarityStateModel>({
  name: 'rarity',
  defaults: {
    rarity: []
  }
})
@Injectable()
export class RarityState {
  @Selector()
  static rarity(state: RarityStateModel): Race[] {
    return state.rarity;
  }

  constructor(private rarityService: RarityService) {}

  @Action(GetAllRarities)
  getAllRarities(ctx: StateContext<RarityStateModel>) {
    const state = ctx.getState();
    return this.rarityService.getRaritiesList().pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          rarity: result
        });
      })
    );
  }
}
