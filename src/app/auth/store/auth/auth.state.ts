import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthStateModel, IUser } from "./auth-state.model";
import { tap } from "rxjs/operators";
import { Login, Logout, Register } from "./auth.actions";
import { Injectable } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    access_token: null,
    user: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.access_token;
  }

  @Selector()
  static user(state: AuthStateModel): {} | null {
    return state.user;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: { access_token: string, user: IUser }) => {
        ctx.patchState({
          access_token: result.access_token,
          user: result.user
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout(state.access_token).pipe(
      tap(() => {
        ctx.setState({
          access_token: null,
          user: null
        });
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload);
  }
}
