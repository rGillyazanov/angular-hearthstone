import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { GetAllTypes } from "./type.actions";
import { TypeStateModel } from "./type-state.model";
import { Type } from "../../shared/models/filters-types";
import { TypeService } from "../../shared/services/type/type.service";

@State<TypeStateModel>({
  name: 'types',
  defaults: {
    types: []
  }
})
@Injectable()
export class TypeState {
  @Selector()
  static types(state: TypeStateModel): Type[] {
    return state.types;
  }

  constructor(private typeService: TypeService) {}

  @Action(GetAllTypes)
  getAllTypes(ctx: StateContext<TypeStateModel>) {
    const state = ctx.getState();
    return this.typeService.getTypesList().pipe(
      tap((result) => {
        ctx.patchState({
          ...state,
          types: result
        });
      })
    );
  }
}
